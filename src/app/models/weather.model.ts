export interface IWeather {
    timelines: ITimelines;
}

export interface ITimelines {
    daily: IDaily[]
}

export interface IDaily {
    time: Date;
    values: IValues;
}

export interface IValues {
    temperatureApparentAvg: number;
    temperatureApparentMax: number;
}

// export const pruebaWeather = {
//     "timelines": {
//       "daily": [
//         {
//           "time": "2024-01-19T11:00:00Z",
//           "values": {
//             "temperatureApparentAvg": 14.06,
//             "temperatureApparentMax": 21.89
//           }
//         },
//         {
//           "time": "2024-01-20T11:00:00Z",
//           "values": {
//             "temperatureApparentAvg": 14.5,
//             "temperatureApparentMax": 20.63
//           }
//         },
//         {
//           "time": "2024-01-21T11:00:00Z",
//           "values": {
//             "temperatureApparentAvg": 14.79,
//             "temperatureApparentMax": 21.09
//           }
//         },
//         {
//           "time": "2024-01-22T11:00:00Z",
//           "values": {
//             "temperatureApparentAvg": 14.45,
//             "temperatureApparentMax": 20.39
//           }
//         },
//         {
//           "time": "2024-01-23T11:00:00Z",
//           "values": {
//             "temperatureApparentAvg": 14.38,
//             "temperatureApparentMax": 22.06
//           }
//         },
//         {
//           "time": "2024-01-24T11:00:00Z",
//           "values": {
//             "temperatureApparentAvg": 16.14,
//             "temperatureApparentMax": 23.03
//           }
//         }
//       ]
//     }
//   }