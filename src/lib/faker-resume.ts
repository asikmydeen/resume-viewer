import { faker } from '@faker-js/faker';
import { Resume } from './resume-schema';

export function generateFakeResume(): Resume {
  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();
  const fullName = `${firstName} ${lastName}`;
  const username = faker.internet.username({ firstName, lastName }).toLowerCase();
  
  // Generate 2-5 work experiences
  const workCount = faker.number.int({ min: 2, max: 5 });
  const work = Array.from({ length: workCount }, (_, i) => {
    const startYear = 2024 - (workCount - i) * 2;
    const startMonth = faker.number.int({ min: 1, max: 12 });
    const isCurrentJob = i === 0;
    const endYear = isCurrentJob ? undefined : startYear + faker.number.int({ min: 1, max: 3 });
    const endMonth = isCurrentJob ? undefined : faker.number.int({ min: 1, max: 12 });
    
    return {
      name: faker.company.name(),
      position: faker.person.jobTitle(),
      url: faker.internet.url(),
      startDate: `${startYear}-${String(startMonth).padStart(2, '0')}`,
      endDate: isCurrentJob ? undefined : `${endYear}-${String(endMonth).padStart(2, '0')}`,
      summary: faker.lorem.paragraph({ min: 2, max: 4 }),
      highlights: Array.from({ length: faker.number.int({ min: 3, max: 6 }) }, () => 
        faker.helpers.arrayElement([
          'React', 'Vue', 'Angular', 'Node.js', 'Python', 'Java', 'TypeScript',
          'AWS', 'Docker', 'Kubernetes', 'PostgreSQL', 'MongoDB', 'GraphQL',
          'CI/CD', 'Microservices', 'REST APIs', 'Machine Learning', 'TensorFlow',
          'Redis', 'Elasticsearch', 'Jenkins', 'GitHub Actions', 'Terraform'
        ])
      ),
    };
  });

  // Generate 3-6 skill categories
  const skillCategories = [
    { name: 'Frontend Development', keywords: ['React', 'Vue.js', 'Angular', 'Next.js', 'TypeScript', 'Tailwind CSS', 'HTML5', 'CSS3', 'Webpack', 'Vite'] },
    { name: 'Backend Development', keywords: ['Node.js', 'Python', 'Java', 'Go', 'Express', 'Django', 'Spring Boot', 'FastAPI', 'REST APIs', 'GraphQL'] },
    { name: 'Database & Storage', keywords: ['PostgreSQL', 'MongoDB', 'MySQL', 'Redis', 'Elasticsearch', 'DynamoDB', 'Cassandra'] },
    { name: 'DevOps & Cloud', keywords: ['Docker', 'Kubernetes', 'AWS', 'Azure', 'GCP', 'CI/CD', 'Jenkins', 'GitHub Actions', 'Terraform', 'Ansible'] },
    { name: 'Mobile Development', keywords: ['React Native', 'Flutter', 'Swift', 'Kotlin', 'iOS', 'Android'] },
    { name: 'Data Science & ML', keywords: ['Python', 'TensorFlow', 'PyTorch', 'Scikit-learn', 'Pandas', 'NumPy', 'Jupyter'] },
    { name: 'Tools & Methodologies', keywords: ['Git', 'Agile', 'Scrum', 'JIRA', 'VS Code', 'Figma', 'Postman', 'TDD', 'Microservices'] },
  ];
  
  const skills = faker.helpers.arrayElements(skillCategories, faker.number.int({ min: 3, max: 6 }));

  // Generate 2-5 projects
  const projectCount = faker.number.int({ min: 2, max: 5 });
  const projects = Array.from({ length: projectCount }, () => {
    const startYear = faker.number.int({ min: 2020, max: 2023 });
    const endYear = faker.number.int({ min: 2023, max: 2024 });
    
    return {
      name: faker.company.catchPhrase(),
      description: faker.lorem.sentences({ min: 2, max: 3 }),
      highlights: Array.from({ length: faker.number.int({ min: 2, max: 4 }) }, () => faker.lorem.sentence()),
      keywords: faker.helpers.arrayElements([
        'React', 'Next.js', 'TypeScript', 'Node.js', 'PostgreSQL', 
        'MongoDB', 'AWS', 'Docker', 'GraphQL', 'Tailwind CSS', 'Python',
        'Machine Learning', 'Microservices', 'Kubernetes', 'Redis'
      ], faker.number.int({ min: 3, max: 6 })),
      startDate: `${startYear}-${String(faker.number.int({ min: 1, max: 12 })).padStart(2, '0')}`,
      endDate: `${endYear}-${String(faker.number.int({ min: 1, max: 12 })).padStart(2, '0')}`,
      url: faker.internet.url(),
      roles: [faker.helpers.arrayElement(['Developer', 'Lead Developer', 'Architect', 'Team Lead'])],
      entity: faker.helpers.arrayElement(['Personal Project', 'Open Source', 'Freelance', 'Company Project']),
      type: faker.helpers.arrayElement(['Application', 'Library', 'Tool', 'Platform', 'API']),
    };
  });

  // Generate Vibe Projects
  const vibeProjectsCount = faker.number.int({ min: 2, max: 4 });
  const vibeProjects = Array.from({ length: vibeProjectsCount }, () => ({
    name: faker.helpers.arrayElement([
      'AI Jazz Composer', 'Vibe Checker 3000', 'Dream Weaver Bot', 'Chaos Monkey GPT', 
      'Neural Style Transfer-er', 'Prompt Engineer Assistant', 'Code Poet'
    ]),
    description: faker.lorem.sentence(),
    status: faker.helpers.arrayElement(['Inflight', 'Completed', 'Ideation'] as const),
    vibe: faker.helpers.arrayElement(['Chill', 'Chaotic', 'Futuristic', 'Retro', 'Cyberpunk', 'Zen']),
    tools: faker.helpers.arrayElements(['OpenAI', 'LangChain', 'Vercel AI SDK', 'Midjourney', 'Stable Diffusion', 'Python', 'Next.js'], 3),
    url: faker.internet.url(),
  }));

  // Generate 1-3 education entries
  const education = Array.from({ length: faker.number.int({ min: 1, max: 3 }) }, () => {
    const studyType = faker.helpers.arrayElement(["Bachelor's", "Master's", "PhD", "Associate"]);
    const startYear = faker.number.int({ min: 2010, max: 2018 });
    const duration = studyType === "PhD" ? 5 : studyType === "Master's" ? 2 : 4;
    
    return {
      institution: `${faker.company.name()} University`,
      url: faker.internet.url(),
      area: faker.helpers.arrayElement(['Computer Science', 'Software Engineering', 'Information Technology', 'Data Science', 'Computer Engineering']),
      studyType,
      startDate: `${startYear}-09`,
      endDate: `${startYear + duration}-06`,
      score: `${faker.number.float({ min: 3.0, max: 4.0, fractionDigits: 2 })} GPA`,
      courses: Array.from({ length: faker.number.int({ min: 3, max: 6 }) }, () => 
        faker.helpers.arrayElement([
          'Data Structures', 'Algorithms', 'Database Systems', 'Operating Systems',
          'Computer Networks', 'Software Engineering', 'Machine Learning', 'Artificial Intelligence',
          'Web Development', 'Mobile Development', 'Cloud Computing', 'Cybersecurity'
        ])
      ),
    };
  });

  // Generate 1-4 awards
  const awards = Array.from({ length: faker.number.int({ min: 1, max: 4 }) }, () => ({
    title: faker.helpers.arrayElement([
      'Employee of the Year',
      'Best Innovation Award',
      'Excellence in Engineering',
      'Hackathon Winner',
      'Outstanding Performance Award',
      'Technical Leadership Award'
    ]),
    date: `${faker.number.int({ min: 2018, max: 2024 })}-${String(faker.number.int({ min: 1, max: 12 })).padStart(2, '0')}`,
    awarder: faker.company.name(),
    summary: faker.lorem.sentence(),
  }));

  // Generate 0-3 publications
  const publications = Array.from({ length: faker.number.int({ min: 0, max: 3 }) }, () => ({
    name: faker.lorem.words({ min: 5, max: 10 }),
    publisher: faker.helpers.arrayElement(['IEEE', 'ACM', 'Springer', 'Medium', 'Dev.to', 'Personal Blog']),
    releaseDate: `${faker.number.int({ min: 2018, max: 2024 })}-${String(faker.number.int({ min: 1, max: 12 })).padStart(2, '0')}`,
    url: faker.internet.url(),
    summary: faker.lorem.paragraph(),
  }));

  // Generate 2-4 languages
  const languages = Array.from({ length: faker.number.int({ min: 2, max: 4 }) }, () => ({
    language: faker.helpers.arrayElement(['English', 'Spanish', 'French', 'German', 'Chinese', 'Japanese', 'Portuguese', 'Russian']),
    fluency: faker.helpers.arrayElement(['Native', 'Fluent', 'Professional', 'Intermediate', 'Basic']),
  }));

  // Generate 2-5 interests
  const interests = Array.from({ length: faker.number.int({ min: 2, max: 5 }) }, () => ({
    name: faker.helpers.arrayElement([
      'Open Source', 'Machine Learning', 'Blockchain', 'IoT', 'Gaming',
      'Photography', 'Music', 'Travel', 'Reading', 'Fitness', 'Cooking'
    ]),
    keywords: Array.from({ length: faker.number.int({ min: 2, max: 4 }) }, () => faker.lorem.word()),
  }));

  // Generate 2-3 references
  const references = Array.from({ length: faker.number.int({ min: 2, max: 3 }) }, () => ({
    name: faker.person.fullName(),
    reference: faker.lorem.paragraph({ min: 2, max: 3 }),
  }));

  return {
    basics: {
      name: fullName,
      label: faker.person.jobTitle(),
      image: faker.image.avatar(),
      email: faker.internet.email({ firstName, lastName }).toLowerCase(),
      phone: faker.phone.number(),
      url: faker.internet.url(),
      summary: faker.lorem.paragraphs({ min: 2, max: 3 }),
      location: {
        address: faker.location.streetAddress(),
        postalCode: faker.location.zipCode(),
        city: faker.location.city(),
        countryCode: faker.location.countryCode('alpha-2'),
        region: faker.location.state({ abbreviated: true }),
      },
      profiles: [
        { network: 'GitHub', username: username, url: `https://github.com/${username}` },
        { network: 'LinkedIn', username: username, url: `https://linkedin.com/in/${username}` },
        { network: 'Twitter', username: `@${username}`, url: `https://twitter.com/${username}` },
      ],
    },
    work,
    education,
    skills,
    projects,
    vibeProjects,
    awards,
    publications,
    languages,
    interests,
    references,
  };
}