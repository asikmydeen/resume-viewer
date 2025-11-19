import { Resume } from './resume-schema';

// Simple random data generators without faker.js
const firstNames = ['John', 'Jane', 'Michael', 'Sarah', 'David', 'Emily', 'Robert', 'Lisa', 'James', 'Maria'];
const lastNames = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Rodriguez', 'Martinez'];
const companies = ['Tech Corp', 'Innovation Labs', 'Digital Solutions', 'Cloud Systems', 'Data Dynamics', 'Web Ventures', 'Code Factory', 'Smart Tech', 'Future Systems', 'Pixel Perfect'];
const jobTitles = ['Senior Developer', 'Full Stack Engineer', 'Software Architect', 'Lead Developer', 'Technical Lead', 'Principal Engineer', 'Staff Engineer', 'Engineering Manager'];
const cities = ['San Francisco', 'New York', 'Austin', 'Seattle', 'Boston', 'Denver', 'Portland', 'Chicago', 'Los Angeles', 'Miami'];
const states = ['CA', 'NY', 'TX', 'WA', 'MA', 'CO', 'OR', 'IL', 'CA', 'FL'];
const techStack = ['React', 'Vue', 'Angular', 'Node.js', 'Python', 'Java', 'TypeScript', 'AWS', 'Docker', 'Kubernetes', 'PostgreSQL', 'MongoDB', 'GraphQL', 'CI/CD', 'Microservices', 'REST APIs'];
const projectNames = [
  'E-Commerce Platform', 'Task Management System', 'Social Media Dashboard', 
  'Analytics Engine', 'Content Management System', 'Mobile Banking App',
  'Real-time Chat Application', 'Inventory Management', 'Customer Portal',
  'Data Visualization Tool'
];

function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomElement<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}

function randomElements<T>(array: T[], count: number): T[] {
  const shuffled = [...array].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

function generateParagraph(): string {
  const sentences = [
    'Developed and maintained scalable web applications using modern technologies.',
    'Collaborated with cross-functional teams to deliver high-quality software solutions.',
    'Implemented best practices for code quality, testing, and deployment.',
    'Mentored junior developers and conducted code reviews.',
    'Optimized application performance and improved user experience.',
    'Led technical discussions and architectural decisions.',
    'Integrated third-party APIs and services.',
    'Managed cloud infrastructure and deployment pipelines.'
  ];
  return randomElements(sentences, randomInt(2, 3)).join(' ');
}

export function generateFakeResume(): Resume {
  const firstName = randomElement(firstNames);
  const lastName = randomElement(lastNames);
  const fullName = `${firstName} ${lastName}`;
  const username = `${firstName.toLowerCase()}${lastName.toLowerCase()}${randomInt(1, 99)}`;
  
  // Generate 2-4 work experiences
  const workCount = randomInt(2, 4);
  const work = Array.from({ length: workCount }, (_, i) => {
    const startYear = 2024 - (workCount - i) * 2;
    const startMonth = randomInt(1, 12);
    const isCurrentJob = i === 0;
    
    return {
      name: randomElement(companies),
      position: randomElement(jobTitles),
      url: `https://${randomElement(companies).toLowerCase().replace(/\s+/g, '')}.com`,
      startDate: `${startYear}-${String(startMonth).padStart(2, '0')}`,
      endDate: isCurrentJob ? undefined : `${startYear + randomInt(1, 3)}-${String(randomInt(1, 12)).padStart(2, '0')}`,
      summary: generateParagraph(),
      highlights: randomElements(techStack, randomInt(3, 5)),
    };
  });

  // Generate 3-5 skill categories
  const skillCategories = [
    { name: 'Frontend', keywords: ['React', 'Vue.js', 'Angular', 'Next.js', 'TypeScript', 'Tailwind CSS', 'HTML/CSS'] },
    { name: 'Backend', keywords: ['Node.js', 'Python', 'Java', 'Express', 'Django', 'Spring Boot', 'REST APIs'] },
    { name: 'Database', keywords: ['PostgreSQL', 'MongoDB', 'MySQL', 'Redis', 'Elasticsearch'] },
    { name: 'DevOps', keywords: ['Docker', 'Kubernetes', 'AWS', 'CI/CD', 'Jenkins', 'GitHub Actions'] },
    { name: 'Tools', keywords: ['Git', 'VS Code', 'Jira', 'Figma', 'Postman'] },
  ];
  
  const skills = randomElements(skillCategories, randomInt(3, 5));

  // Generate 2-4 projects
  const projectCount = randomInt(2, 4);
  const projects = Array.from({ length: projectCount }, () => ({
    name: randomElement(projectNames),
    description: generateParagraph(),
    highlights: [generateParagraph()],
    keywords: randomElements(techStack, randomInt(3, 5)),
    startDate: `${randomInt(2020, 2023)}-${String(randomInt(1, 12)).padStart(2, '0')}`,
    endDate: `${randomInt(2023, 2024)}-${String(randomInt(1, 12)).padStart(2, '0')}`,
    url: `https://project-${randomInt(1000, 9999)}.demo.com`,
  }));

  // Generate 1-2 education entries
  const education = Array.from({ length: randomInt(1, 2) }, () => ({
    institution: `${randomElement(['State', 'Tech', 'National', 'City'])} University`,
    area: randomElement(['Computer Science', 'Software Engineering', 'Information Technology', 'Data Science']),
    studyType: randomElement(["Bachelor's", "Master's"]),
    startDate: '2014-09',
    endDate: '2018-06',
  }));

  // Generate 2-3 references
  const references = Array.from({ length: randomInt(2, 3) }, () => ({
    name: `${randomElement(firstNames)} ${randomElement(lastNames)}`,
    reference: 'Working with this developer was an absolute pleasure. They consistently delivered high-quality work and demonstrated excellent technical skills and professionalism.',
  }));

  const cityIndex = randomInt(0, cities.length - 1);

  return {
    basics: {
      name: fullName,
      label: randomElement(jobTitles),
      email: `${username}@example.com`,
      phone: `+1 (${randomInt(200, 999)}) ${randomInt(200, 999)}-${randomInt(1000, 9999)}`,
      summary: `Passionate ${randomElement(jobTitles).toLowerCase()} with ${randomInt(5, 12)}+ years of experience building scalable web applications. Specialized in modern JavaScript frameworks and cloud technologies. Strong advocate for clean code, testing, and continuous improvement.`,
      location: {
        city: cities[cityIndex],
        region: states[cityIndex],
        countryCode: 'US',
      },
      profiles: [
        { network: 'GitHub', username: username, url: `https://github.com/${username}` },
        { network: 'LinkedIn', username: username, url: `https://linkedin.com/in/${username}` },
        { network: 'Twitter', username: username, url: `https://twitter.com/${username}` },
      ],
    },
    work,
    education,
    skills,
    projects,
    awards: [],
    publications: [],
    languages: [],
    interests: [],
    references,
  };
}