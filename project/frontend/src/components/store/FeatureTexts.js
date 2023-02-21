const FeatureTexts = {
  dataScience: {
    title: "Data Scientist",
    description:
      "the score is calculated by looking at the different repositories of the Github user. The readmes are fed into an intelligent recommender system that checks how many projects the user has contributed to in the field of data science.",
  },
  medicalAi: {
    title: "AI in Medicine",
    description:
      "the score is calculated by looking at the different repositories of the Github user. The readmes are fed into an intelligent recommender system that checks how many projects the user has contributed to in the field of medical AI.",
  },
  computerVision: {
    title: "Computer Vision",
    description:
      "the score is calculated by looking at the different repositories of the Github user. The readmes are fed into an intelligent recommender system that checks how many projects the user has contributed to in the field of Computer Vision.",
  },
  activity: {
    title: "Activity",
    description:
      "the score is calculated by looking at the different repositories of the Github user. Here the Algorithm measure how active the user is. It's done by looking how many contributions in what time period the users made",
  },
  experience: {
    title: "Experience",
    description:
      "the score is calculated by looking at the different repositories of the Github user. The algorithm calculates how many years in comparison to the other users this one is contributing.",
  },
};

export const Tooltip = {
  recommendProfiles: {
    header: "Why do I see these people?",
    text: "These Profiles are crawled from Github. Based on your their Projects and individual Commits, they are rated by the 3 Features you see on the left. You can adjust the weight of those by using the Sliders on the left side of the screen.",
  },
  selectCategory:{
    header:"Did you know?",
    text:"Here you can choose your main Jobrole Category you are looking for. Please use the Dropdown to select a Catgegory."
  },
  gaugeInfo:{
    header:"What does this Gauge represent?",
    text:"The number in percent determines the total score of the features depending on the slider values. The parts filled with intense colours represent the current value of the respective feature depending on the corresponding slider value. The lightly coloured areas represent the maximum score of the respective feature in dependence of the slider value.",
  }
};
export default FeatureTexts;
