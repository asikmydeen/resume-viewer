import { faker } from '@faker-js/faker';
import { Resume } from './resume-schema';

export function generateFakeResume(): Resume {
  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();
  const fullName = `${firstName} ${lastName}`;
  
  // Generate 2-4 work experiences
  const workCount = faker.number.int({ min: 2, max: 4 });
  const work = Array.from({ length: workCount }, (_, i) => {
    const startYear = 2024 - (workCount - i) * 2;
    const startMonth = faker.number.int({ min: 1, max: 12 });
    const isCurrentJob = i === 0;
    
    return {
      name: faker.company.name(),
      position: faker.person.jobTitle(),
      url: faker.internet.url(),
      startDate: `${startYear}-${String(startMonth).padStart(2, '0')}`,
      endDate: isCurrentJob ? undefined : `${startYear + faker.number.int({ min: 1, max: 3 })}-${String(faker.number.int({ min: 1, max: 12 })).padStart(2, '0')}`,
      summary: faker.lorem.paragraph(),
      highlights: Array.from({ length: faker.number.int({ min: 3, max: 5 }) }, () => 
        faker.helpers.arrayElement([
          'React', 'Vue', 'Angular', 'Node.js', 'Python', 'Java', 'TypeScript',
          'AWS', 'Docker', 'Kubernetes', 'PostgreSQL', 'MongoDB', 'GraphQL',
          'CI/CD', 'Microservices', 'REST APIs', 'Machine Learning'
        ])
      ),
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
  
  const skills = faker.helpers.arrayElements(skillCategories, faker.number.int({ min: 3, max: 5 }));

  // Generate 2-4 projects
  const projectCount = faker.number.int({ min: 2, max: 4 });
  const projects = Array.from({ length: projectCount }, () => ({
    name: faker.company.catchPhrase(),
    description: faker.lorem.sentences(2),
    highlights: [faker.lorem.sentence()],
    keywords: faker.helpers.arrayElements([
      'React', 'Next.js', 'TypeScript', 'Node.js', 'PostgreSQL', 
      'MongoDB', 'AWS', 'Docker', 'GraphQL', 'Tailwind CSS'
    ], faker.number.int({ min: 3, max: 5 })),
    startDate: `${faker.number.int({ min: 2020, max: 2023 })}-${String(faker.number.int({ min: 1, max: 12 })).padStart(2, '0')}`,
    endDate: `${faker.number.int({ min: 2023, max: 2024 })}-${String(faker.number.int({ min: 1, max: 12 })).padStart(2, '0')}`,
    url: faker.internet.url(),
  }));

  // Generate 1-2 education entries
  const education = Array.from({ length: faker.number.int({ min: 1, max: 2 }) }, () => ({
    institution: faker.company.name() + ' University',
    area: faker.helpers.arrayElement(['Computer Science', 'Software Engineering', 'Information Technology', 'Data Science']),
    studyType: faker.helpers.arrayElement(["Bachelor's", "Master's"]),
    startDate: '2014-09',
    endDate: '2018-06',
  }));

  // Generate 2-3 references
  const references = Array.from({ length: faker.number.int({ min: 2, max: 3 }) }, () => ({
    name: faker.person.fullName(),
    reference: faker.lorem.paragraph(),
  }));

  return {
    basics: {
      name: fullName,
      label: faker.person.jobTitle(),
      email: faker.internet.email({ firstName, lastName }).toLowerCase(),
      phone: faker.phone.number(),
      summary: faker.lorem.paragraphs(2),
      location: {
        city: faker.location.city(),
        region: faker.location.state({ abbreviated: true }),
        countryCode: 'US',
      },
      profiles: [
        { network: 'GitHub', username: faker.internet.username({ firstName, lastName }), url: `https://github.com/${faker.internet.username({ firstName, lastName })}` },
        { network: 'LinkedIn', username: faker.internet.username({ firstName, lastName }), url: `https://linkedin.com/in/${faker.internet.username({ firstName, lastName })}` },
        { network: 'Twitter', username: faker.internet.username({ firstName, lastName }), url: `https://twitter.com/${faker.internet.username({ firstName, lastName })}` },
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