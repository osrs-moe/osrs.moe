// intervals are in milliseconds
const second = 1000;
const minute = 60 * second;

export interface PlantData {
  interval: number;
  interval_description: string;
  color: string;
  plants: {
    name: string;
    windows: number;
  }[];
}

//["#a55ca5", "#67b6c7", "#bccd7a", "#eb9743", '#ff24f2']

export default [
  {
    interval: 10 * minute,
    interval_description: "10m",
    color: "#a55ca5",
    plants: [
      {
        name: "Potato",
        windows: 4,
      },
      {
        name: "Onion",
        windows: 4,
      },
      {
        name: "Cabbage",
        windows: 4,
      },
      {
        name: "Tomato",
        windows: 4,
      },
      {
        name: "Sweetcorn",
        windows: 5,
      },
      {
        name: "Strawberry",
        windows: 6,
      },
      {
        name: "Watermelon",
        windows: 7,
      },
    ],
  },
  {
    interval: 20 * minute,
    interval_description: "20m",
    color: "#67b6c7",
    plants: [
      {
        name: "White Lilly",
        windows: 4,
      },
      {
        name: "Redberry",
        windows: 5,
      },
      {
        name: "Cadavaberry",
        windows: 6,
      },
      {
        name: "Dwellberry",
        windows: 7,
      },
      {
        name: "Cadavaberry",
        windows: 8,
      },
      {
        name: "Whiteberry",
        windows: 8,
      },
      {
        name: "Poison Ivy",
        windows: 8,
      },
      {
        name: "Herbs",
        windows: 4,
      },
    ],
  },
  {
    interval: 40 * minute,
    interval_description: "40m",
    color: "#bccd7a",
    plants: [
      {
        name: "Bittercap Mushroom",
        windows: 6,
      },
      {
        name: "Oak Tree",
        windows: 4,
      },
      {
        name: "Willow Tree",
        windows: 5,
      },
      {
        name: "Maple Tree",
        windows: 7,
      },
      {
        name: "Yew Tree",
        windows: 9,
      },
      {
        name: "Magic Tree",
        windows: 11,
      },
    ],
  },
  {
    interval: 80 * minute,
    interval_description: "1h 20m",
    color: "#eb9743",
    plants: [
      {
        name: "Morchella Mushroom",
        windows: 3,
      },
      {
        name: "Belladonna",
        windows: 3,
      },
      {
        name: "Cactus",
        windows: 7,
      },
    ],
  },
  {
    interval: 160 * minute,
    interval_description: "2h 40m",
    color: "#ff24f2",
    plants: [
      {
        name: "Fruit Trees",
        windows: 6,
      },
      {
        name: "Calquat Trees",
        windows: 8,
      },
    ],
  } /*,
	{
		interval: 320 * minute,
		plants: [
			{
				name: 'Spirit Tree',
				windows: 11
			}
		]
	}*/,
] as PlantData[];
