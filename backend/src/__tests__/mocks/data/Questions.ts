import type { Question } from '../../../typings/Question';

export const questionsIndexData: Question[] = [
  {
    questionID: '93d119af-b201-4747-a49b-a81fa5167caa',
    questionSetID: '586f42bb-9b0a-4428-818b-5fb4874bbb1e',
    title: 'In welke fase bevindt jouw bedrijf zich?',
    inputType: 'Radio',
    description: 'Bepalen in welke fase je bedrijf zich bevindt.',
    requiredPhase: '',
  },
  {
    questionID: 'fd446cdc-5871-4a5c-9f2a-34cf285c1a6f',
    questionSetID: 'a343e09a-6c91-4e22-9f87-fbee2c6c4ab2',
    title: 'Ben je op de hoogte van de nieuwe businessmodellen?',
    inputType: 'Radio',
    description: 'Onderzoek of je bekend bent met nieuwe zakelijke modellen, relevant in de pre-startup, startup en scale-up fasen.',
    requiredPhase: [
      'pre-startup',
      'startup',
      'scale-up',
    ],
  },
  {
    questionID: '0f22c869-10a2-4d16-b9d3-21a0df04d09b',
    questionSetID: 'a343e09a-6c91-4e22-9f87-fbee2c6c4ab2',
    title: 'Wil je een nieuwe cel starten?',
    inputType: 'Radio',
    description: 'Verken de wens om een nieuwe afdeling te starten, met focus op de scale-up fase.',
    requiredPhase: [
      'scale-up',
    ],
  },
  {
    questionID: 'eb55ce5f-63f5-4927-a897-0f1c4a758e02',
    questionSetID: 'a343e09a-6c91-4e22-9f87-fbee2c6c4ab2',
    title: 'Ben je op de hoogte van de kansen die nieuwe technologieën bieden voor je bedrijf?',
    inputType: 'Radio',
    description: 'Onderzoek of je op de hoogte bent van kansen die nieuwe technologieën bieden, relevant in de pre-startup, startup en scale-up fasen.',
    requiredPhase: [
      'pre-startup',
      'startup',
      'scale-up',
    ],
  },
  {
    questionID: '9367fe56-6a12-4c06-b90b-7f39c4069d15',
    questionSetID: '19d8248f-355f-4f82-994a-07237b1a290c',
    title: 'Heb je erover nagedacht waar je markt over 10 jaar staat?',
    inputType: 'Radio',
    description: 'Onderzoek of je hebt nagedacht over de positie van je markt over een periode van 10 jaar, relevant in de pre-startup, startup en scale-up fasen.',
    requiredPhase: [
      'pre-startup',
      'startup',
      'scale-up',
    ],
  },
  {
    questionID: '432692a0-bfe1-4144-bb94-40036730d7e1',
    questionSetID: '19d8248f-355f-4f82-994a-07237b1a290c',
    title: 'Heb je een BHAG?',
    inputType: 'Radio',
    description: 'Verken of je een \'Big Hairy Audacious Goal\' hebt gesteld, relevant in de pre-startup, startup en scale-up fasen.',
    requiredPhase: [
      'pre-startup',
      'startup',
      'scale-up',
    ],
  },
  {
    questionID: '8e64eaac-2eeb-4c94-bf5c-8de7df52d7c5',
    questionSetID: '2496b27f-6dd2-4f81-9481-c6fddd87d61e',
    title: 'Heb je een eerste klant (launching customer)?',
    inputType: 'Radio',
    description: 'Verken of je al een eerste klant hebt als lanceerklant, relevant in de startup fase.',
    requiredPhase: [
      'startup',
    ],
  },
  {
    questionID: '1cc1980c-5077-4391-b14a-674540bb1de5',
    questionSetID: '2496b27f-6dd2-4f81-9481-c6fddd87d61e',
    title: 'Doe je het echt anders dan de huidige partijen? (in plaats van beter, sneller en/of goedkoper)',
    inputType: 'Radio',
    description: 'Onderzoek of je bedrijf zich werkelijk onderscheidt van bestaande partijen, relevant in de scale-up fase.',
    requiredPhase: [
      'startup',
      'scale-up',
    ],
  },
  {
    questionID: '5d2572ed-cce7-4a48-a3b2-12d1cf5da531',
    questionSetID: '23f75520-c2ce-49a1-ac28-00ad8a81e585',
    title: 'Weet je wie je concurrentie is?',
    inputType: 'Radio',
    description: 'Onderzoek of je bekend bent met je concurrentie, relevant in de startup en scale-up fasen.',
    requiredPhase: [
      'startup',
      'scale-up',
    ],
  },
  {
    questionID: 'c00c7fb4-b3a4-4b3b-97a5-21bc0b8c3db5',
    questionSetID: '23f75520-c2ce-49a1-ac28-00ad8a81e585',
    title: 'Weet je hoe de concurrent je failliet kan maken?',
    inputType: 'Radio',
    description: 'Onderzoek of je inzicht hebt in hoe de concurrentie je bedrijf kan beïnvloeden, relevant in de scale-up fase.',
    requiredPhase: [
      'scale-up',
    ],
  },
  {
    questionID: '0c0649d9-85eb-41eb-8c8f-77b2b7cc80f1',
    questionSetID: 'd384ebe6-74e6-4ee9-9d8e-255df84d21c8',
    title: 'Is je team compleet?',
    inputType: 'Radio',
    description: 'Verken of je team compleet is, relevant in de startup en scale-up fasen.',
    requiredPhase: [
      'startup',
      'scale-up',
    ],
  },
  {
    questionID: 'd2e40d04-8a0b-4f9a-9d1d-812075f0ce65',
    questionSetID: 'd384ebe6-74e6-4ee9-9d8e-255df84d21c8',
    title: 'Heb je een duidelijke rolverdeling?',
    inputType: 'Radio',
    description: 'Onderzoek of er een duidelijke rolverdeling is binnen je team, relevant in de startup en scale-up fasen.',
    requiredPhase: [
      'startup',
      'scale-up',
    ],
  },
  {
    questionID: 'f583dcb1-3cfb-4e7e-8f3c-3cfc5b8df9c6',
    questionSetID: 'd384ebe6-74e6-4ee9-9d8e-255df84d21c8',
    title: 'Zijn ieders persoonlijke doelen bekend?',
    inputType: 'Radio',
    description: 'Onderzoek of de persoonlijke doelen van elk teamlid bekend zijn, relevant in de pre-startup en scale-up fasen.',
    requiredPhase: [
      'startup',
      'scale-up',
    ],
  },
  {
    questionID: '35bfb0fc-9ac4-40b2-9ef0-1eaf34f713ff',
    questionSetID: 'bd814254-8b25-477a-9ed6-997dc63e53c1',
    title: 'Heeft je bedrijf een consultancy tak?',
    inputType: 'Radio',
    description: 'Verken of je bedrijf een consultancytak heeft, relevant in de startup fase.',
    requiredPhase: [
      'startup',
      'scale-up',
    ],
  },
  {
    questionID: '89472ec4-2f7a-4c27-b611-bb2f0a9bb773',
    questionSetID: 'bd814254-8b25-477a-9ed6-997dc63e53c1',
    title: 'Heeft je bedrijf een vermogensmodel?',
    inputType: 'Radio',
    description: 'Verken of je bedrijf een vermogensmodel heeft, relevant in de startup fase.',
    requiredPhase: [
      'startup',
    ],
  },
  {
    questionID: '7a20bf4d-7381-490f-b3c6-7e86055de513',
    questionSetID: 'bad26f4f-0dec-40c9-a333-902477e6dd9d',
    title: 'Eerste werknemer',
    inputType: 'text',
    description: 'Bespreek de aanstelling van de eerste werknemer, relevant in de startup fase.',
    requiredPhase: [
      'startup',
    ],
  },
  {
    questionID: '73a8fb7d-65f3-45e6-bfb3-98b8d0418766',
    questionSetID: 'bad26f4f-0dec-40c9-a333-902477e6dd9d',
    title: 'Juridische entiteiten',
    inputType: 'text',
    description: 'Onderzoek de juridische entiteiten van je bedrijf, relevant in de startup en scale-up fasen.',
    requiredPhase: [
      'startup',
      'scale-up',
    ],
  },
  {
    questionID: 'e9916fc0-8a34-48a9-87f8-6b78bfcf6aa0',
    questionSetID: 'bad26f4f-0dec-40c9-a333-902477e6dd9d',
    title: 'Duidelijke afspraken tussen aandeelhouders?',
    inputType: 'Radio',
    description: 'Onderzoek of er duidelijke afspraken zijn tussen aandeelhouders, relevant in de pre-startup, startup en scale-up fasen.',
    requiredPhase: [
      'startup',
      'scale-up',
    ],
  },
  {
    questionID: '88d660e8-9b27-4bc2-b154-c7eb20bf39e2',
    questionSetID: 'bad26f4f-0dec-40c9-a333-902477e6dd9d',
    title: 'Heeft je bedrijf binnenkort behoefte aan externe financiering?',
    inputType: 'Radio',
    description: 'Onderzoek of je bedrijf binnenkort externe financiering nodig heeft, relevant in de pre-startup, startup en scale-up fasen.',
    requiredPhase: [
      'startup',
      'scale-up',
    ],
  },
  {
    questionID: 'f58d3f16-8651-439c-b6f2-ca4da0caa0aa',
    questionSetID: '45394ab5-aee6-4cca-b004-45c8cb66fbb8',
    title: 'Heb je al nagedacht over je bedrijf vanuit een strategisch software platform?',
    inputType: 'Multi-select',
    description: 'Verken of je al hebt nagedacht over je bedrijf vanuit een strategisch softwareplatform, relevant in de scale-up fase.',
    requiredPhase: [
      'scale-up',
    ],
  },
  {
    questionID: '4a4251fe-af11-4bc2-8bc1-7d0506b7d7d1',
    questionSetID: '97522514-18f8-477d-ac06-86391e5b6c9e',
    title: 'Samenwerkingen',
    inputType: 'Text',
    description: 'Beschrijf mogelijke samenwerkingen voor de scale-up fase.',
    requiredPhase: [
      'scale-up',
    ],
  },
];
