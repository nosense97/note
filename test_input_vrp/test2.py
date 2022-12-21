data = {
  "free_vehicles": [
    {
      "index": 1,
      "trip_index": 0,
      "cbm": 0,
      "weight": 1800000,
      "pallet": 0,
      "free_intervals": [
        {
          "start": 27000,
          "end": 64800,
          "interval_range": 37800
        }
      ],
      "service_time_coef": {
        "fixed_load_time": 1800,
        "fixed_unload_time": 0,
        "load_time_per_ton": 720,
        "unload_time_per_ton": 720,
        "load_time_per_cbm": 360,
        "unload_time_per_cbm": 360
      },
      "free_range": 37800,
      "cbm_by_time": 0,
      "weight_by_time": 1800000
    },
    {
      "index": 2,
      "trip_index": 0,
      "cbm": 0,
      "weight": 1600000,
      "pallet": 0,
      "free_intervals": [
        {
          "start": 23745,
          "end": 77751,
          "interval_range": 54006
        }
      ],
      "service_time_coef": {
        "fixed_load_time": 1800,
        "fixed_unload_time": 0,
        "load_time_per_ton": 720,
        "unload_time_per_ton": 720,
        "load_time_per_cbm": 360,
        "unload_time_per_cbm": 360
      },
      "free_range": 54006,
      "cbm_by_time": 0,
      "weight_by_time": 1600000
    },
    {
      "index": 3,
      "trip_index": 0,
      "cbm": 0,
      "weight": 1900000,
      "pallet": 0,
      "free_intervals": [
        {
          "start": 22456,
          "end": 44034,
          "interval_range": 21578
        },
        {
          "start": 47643,
          "end": 69226,
          "interval_range": 21583
        }
      ],
      "service_time_coef": {
        "fixed_load_time": 1800,
        "fixed_unload_time": 0,
        "load_time_per_ton": 720,
        "unload_time_per_ton": 720,
        "load_time_per_cbm": 360,
        "unload_time_per_cbm": 360
      },
      "free_range": 43161,
      "cbm_by_time": 0,
      "weight_by_time": 1900000
    },
    {
      "index": 4,
      "trip_index": 0,
      "cbm": 0,
      "weight": 1900000,
      "pallet": 0,
      "free_intervals": [
        {
          "start": 27599,
          "end": 39260,
          "interval_range": 11661
        },
        {
          "start": 42866,
          "end": 86349,
          "interval_range": 43483
        }
      ],
      "service_time_coef": {
        "fixed_load_time": 1800,
        "fixed_unload_time": 0,
        "load_time_per_ton": 720,
        "unload_time_per_ton": 720,
        "load_time_per_cbm": 360,
        "unload_time_per_cbm": 360
      },
      "free_range": 55144,
      "cbm_by_time": 0,
      "weight_by_time": 1900000
    }
  ],
  "assigned_vehicles": [
    {
      "index": 0,
      "trip_index": 0,
      "cbm": 0,
      "weight": 2000000,
      "pallet": 0,
      "assigned_requests": [
        {
          "index": 0,
          "items": [
            {
              "index": 0,
              "quantity": 1,
              "weight": 900000,
              "cbm": 0,
              "quantity_per_pallet": 0,
              "size": {
                "length": 0,
                "width": 0,
                "height": 0
              },
              "config_type": [
                0
              ],
              "vrp_type": 8,
              "request_index": 0,
              "virtual_cbm_coef": [
                0
              ],
              "split_index": -1,
              "one_item_weight": 900000.0,
              "one_item_cbm": 0.0
            }
          ],
          "pickup_location": {
            "index": 0,
            "location_index": 0,
            "working_interval": {
              "start": 25230,
              "end": 72036,
              "interval_range": 46806
            },
            "break_intervals": [

            ],
            "service_time_coef": {
              "fixed_load_time": 1800,
              "fixed_unload_time": 0,
              "load_time_per_ton": 720,
              "unload_time_per_ton": 0,
              "load_time_per_cbm": 360,
              "unload_time_per_cbm": 0
            },
            "config_type": [

            ],
            "vrp_type": 3,
            "free_intervals": [
              {
                "start": 25230,
                "end": 72036,
                "interval_range": 46806
              }
            ],
            "lat": 10.79159458309302,
            "lng": 106.73135407000836,
            "weight": 0,
            "cbm": 0,
            "pallet": 0
          },
          "delivery_location": {
            "index": 0,
            "location_index": 1,
            "working_interval": {
              "start": 1790,
              "end": 64821,
              "interval_range": 63031
            },
            "break_intervals": [

            ],
            "service_time_coef": {
              "fixed_load_time": 0,
              "fixed_unload_time": 1800,
              "load_time_per_ton": 0,
              "unload_time_per_ton": 720,
              "load_time_per_cbm": 0,
              "unload_time_per_cbm": 0
            },
            "config_type": [

            ],
            "vrp_type": 2,
            "free_intervals": [
              {
                "start": 1790,
                "end": 64821,
                "interval_range": 63031
              }
            ],
            "lat": 10.7381045,
            "lng": 106.720636,
            "weight": 0,
            "cbm": 0,
            "pallet": 0
          },
          "assigned_vehicle": 'null',
          "trip_no": 'null',
          "vrp_type": 7,
          "backhault_requests": 'false',
          "split_index": -1
        },
        {
          "index": 1,
          "items": [
            {
              "index": 1,
              "quantity": 1,
              "weight": 700000,
              "cbm": 0,
              "quantity_per_pallet": 0,
              "size": {
                "length": 0,
                "width": 0,
                "height": 0
              },
              "config_type": [
                0
              ],
              "vrp_type": 8,
              "request_index": 1,
              "virtual_cbm_coef": [
                0
              ],
              "split_index": -1,
              "one_item_weight": 700000.0,
              "one_item_cbm": 0.0
            }
          ],
          "pickup_location": {
            "index": 0,
            "location_index": 0,
            "working_interval": {
              "start": 25230,
              "end": 72036,
              "interval_range": 46806
            },
            "break_intervals": [

            ],
            "service_time_coef": {
              "fixed_load_time": 1800,
              "fixed_unload_time": 0,
              "load_time_per_ton": 720,
              "unload_time_per_ton": 0,
              "load_time_per_cbm": 360,
              "unload_time_per_cbm": 0
            },
            "config_type": [

            ],
            "vrp_type": 3,
            "free_intervals": [
              {
                "start": 25230,
                "end": 72036,
                "interval_range": 46806
              }
            ],
            "lat": 10.79159458309302,
            "lng": 106.73135407000836,
            "weight": 0,
            "cbm": 0,
            "pallet": 0
          },
          "delivery_location": {
            "index": 1,
            "location_index": 2,
            "working_interval": {
              "start": 28813,
              "end": 64821,
              "interval_range": 36008
            },
            "break_intervals": [

            ],
            "service_time_coef": {
              "fixed_load_time": 0,
              "fixed_unload_time": 1800,
              "load_time_per_ton": 0,
              "unload_time_per_ton": 720,
              "load_time_per_cbm": 0,
              "unload_time_per_cbm": 0
            },
            "config_type": [

            ],
            "vrp_type": 2,
            "free_intervals": [
              {
                "start": 28813,
                "end": 64821,
                "interval_range": 36008
              }
            ],
            "lat": 10.7344494,
            "lng": 106.7096775,
            "weight": 0,
            "cbm": 0,
            "pallet": 0
          },
          "assigned_vehicle": 'null',
          "trip_no": 'null',
          "vrp_type": 7,
          "backhault_requests": 'false',
          "split_index": -1
        },
        {
          "index": 2,
          "items": [
            {
              "index": 2,
              "quantity": 1,
              "weight": 100000,
              "cbm": 0,
              "quantity_per_pallet": 0,
              "size": {
                "length": 0,
                "width": 0,
                "height": 0
              },
              "config_type": [
                0
              ],
              "vrp_type": 8,
              "request_index": 2,
              "virtual_cbm_coef": [
                0
              ],
              "split_index": -1,
              "one_item_weight": 100000.0,
              "one_item_cbm": 0.0
            },
            {
              "index": 3,
              "quantity": 1,
              "weight": 800000,
              "cbm": 0,
              "quantity_per_pallet": 0,
              "size": {
                "length": 0,
                "width": 0,
                "height": 0
              },
              "config_type": [
                0
              ],
              "vrp_type": 8,
              "request_index": 2,
              "virtual_cbm_coef": [
                0
              ],
              "split_index": -1,
              "one_item_weight": 800000.0,
              "one_item_cbm": 0.0
            }
          ],
          "pickup_location": {
            "index": 0,
            "location_index": 0,
            "working_interval": {
              "start": 25230,
              "end": 72036,
              "interval_range": 46806
            },
            "break_intervals": [

            ],
            "service_time_coef": {
              "fixed_load_time": 1800,
              "fixed_unload_time": 0,
              "load_time_per_ton": 720,
              "unload_time_per_ton": 0,
              "load_time_per_cbm": 360,
              "unload_time_per_cbm": 0
            },
            "config_type": [

            ],
            "vrp_type": 3,
            "free_intervals": [
              {
                "start": 25230,
                "end": 72036,
                "interval_range": 46806
              }
            ],
            "lat": 10.79159458309302,
            "lng": 106.73135407000836,
            "weight": 0,
            "cbm": 0,
            "pallet": 0
          },
          "delivery_location": {
            "index": 2,
            "location_index": 3,
            "working_interval": {
              "start": 28813,
              "end": 64821,
              "interval_range": 36008
            },
            "break_intervals": [

            ],
            "service_time_coef": {
              "fixed_load_time": 0,
              "fixed_unload_time": 1800,
              "load_time_per_ton": 0,
              "unload_time_per_ton": 720,
              "load_time_per_cbm": 0,
              "unload_time_per_cbm": 0
            },
            "config_type": [

            ],
            "vrp_type": 2,
            "free_intervals": [
              {
                "start": 28813,
                "end": 64821,
                "interval_range": 36008
              }
            ],
            "lat": 10.7551532,
            "lng": 106.6897121,
            "weight": 0,
            "cbm": 0,
            "pallet": 0
          },
          "assigned_vehicle": 'null',
          "trip_no": 'null',
          "vrp_type": 7,
          "backhault_requests": 'false',
          "split_index": -1
        }
      ],
      "route": [
        {
          "index": 0,
          "location_index": 0,
          "working_interval": {
            "start": 25230,
            "end": 72036,
            "interval_range": 46806
          },
          "break_intervals": [

          ],
          "items": [

          ],
          "vrp_type": 3,
          "lat": 10.79159458309302,
          "lng": 106.73135407000836,
          "load_coef": 0,
          "free_intervals": [
            {
              "start": 25230,
              "end": 72036,
              "interval_range": 46806
            }
          ],
          "service_time": 0,
          "fixed_service_time": 0,
          "arrival_time": 25230,
          "departure_time": 25230,
          "distance_cumul": 0,
          "time_cumul": 25230,
          "weight": 0.0,
          "cbm": 0.0,
          "weight_cumul": 0.0,
          "cbm_cumul": 0.0
        },
        {
          "index": 0,
          "location_index": 0,
          "working_interval": {
            "start": 25230,
            "end": 72036,
            "interval_range": 46806
          },
          "break_intervals": [

          ],
          "items": [
            {
              "index": 0,
              "quantity": 1,
              "weight": 900000,
              "cbm": 0,
              "quantity_per_pallet": 0,
              "size": {
                "length": 0,
                "width": 0,
                "height": 0
              },
              "config_type": [
                0
              ],
              "vrp_type": 8,
              "request_index": 0,
              "virtual_cbm_coef": [
                0
              ],
              "split_index": -1,
              "one_item_weight": 900000.0,
              "one_item_cbm": 0.0
            },
            {
              "index": 1,
              "quantity": 1,
              "weight": 700000,
              "cbm": 0,
              "quantity_per_pallet": 0,
              "size": {
                "length": 0,
                "width": 0,
                "height": 0
              },
              "config_type": [
                0
              ],
              "vrp_type": 8,
              "request_index": 1,
              "virtual_cbm_coef": [
                0
              ],
              "split_index": -1,
              "one_item_weight": 700000.0,
              "one_item_cbm": 0.0
            },
            {
              "index": 2,
              "quantity": 1,
              "weight": 100000,
              "cbm": 0,
              "quantity_per_pallet": 0,
              "size": {
                "length": 0,
                "width": 0,
                "height": 0
              },
              "config_type": [
                0
              ],
              "vrp_type": 8,
              "request_index": 2,
              "virtual_cbm_coef": [
                0
              ],
              "split_index": -1,
              "one_item_weight": 100000.0,
              "one_item_cbm": 0.0
            },
            {
              "index": 3,
              "quantity": 1,
              "weight": 800000,
              "cbm": 0,
              "quantity_per_pallet": 0,
              "size": {
                "length": 0,
                "width": 0,
                "height": 0
              },
              "config_type": [
                0
              ],
              "vrp_type": 8,
              "request_index": 2,
              "virtual_cbm_coef": [
                0
              ],
              "split_index": -1,
              "one_item_weight": 800000.0,
              "one_item_cbm": 0.0
            }
          ],
          "vrp_type": 3,
          "lat": 10.79159458309302,
          "lng": 106.73135407000836,
          "load_coef": 1,
          "free_intervals": [
            {
              "start": 25230,
              "end": 72036,
              "interval_range": 46806
            }
          ],
          "service_time": 1800,
          "fixed_service_time": 1800,
          "arrival_time": 25230,
          "departure_time": 28830,
          "distance_cumul": 0,
          "time_cumul": 28830,
          "weight": 2500000,
          "cbm": 0,
          "weight_cumul": 2500000.0,
          "cbm_cumul": 0.0
        },
        {
          "index": 0,
          "location_index": 1,
          "working_interval": {
            "start": 1790,
            "end": 64821,
            "interval_range": 63031
          },
          "break_intervals": [

          ],
          "items": [
            {
              "index": 0,
              "quantity": 1,
              "weight": 900000,
              "cbm": 0,
              "quantity_per_pallet": 0,
              "size": {
                "length": 0,
                "width": 0,
                "height": 0
              },
              "config_type": [
                0
              ],
              "vrp_type": 8,
              "request_index": 0,
              "virtual_cbm_coef": [
                0
              ],
              "split_index": -1,
              "one_item_weight": 900000.0,
              "one_item_cbm": 0.0
            }
          ],
          "vrp_type": 2,
          "lat": 10.7381045,
          "lng": 106.720636,
          "load_coef": -1,
          "free_intervals": [
            {
              "start": 1790,
              "end": 64821,
              "interval_range": 63031
            }
          ],
          "service_time": 648,
          "fixed_service_time": 1800,
          "arrival_time": 31294,
          "departure_time": 33742,
          "distance_cumul": 22883,
          "time_cumul": 33742,
          "weight": -900000,
          "cbm": 0,
          "weight_cumul": 1600000.0,
          "cbm_cumul": 0.0
        },
        {
          "index": 1,
          "location_index": 2,
          "working_interval": {
            "start": 28813,
            "end": 64821,
            "interval_range": 36008
          },
          "break_intervals": [

          ],
          "items": [
            {
              "index": 1,
              "quantity": 1,
              "weight": 700000,
              "cbm": 0,
              "quantity_per_pallet": 0,
              "size": {
                "length": 0,
                "width": 0,
                "height": 0
              },
              "config_type": [
                0
              ],
              "vrp_type": 8,
              "request_index": 1,
              "virtual_cbm_coef": [
                0
              ],
              "split_index": -1,
              "one_item_weight": 700000.0,
              "one_item_cbm": 0.0
            }
          ],
          "vrp_type": 2,
          "lat": 10.7344494,
          "lng": 106.7096775,
          "load_coef": -1,
          "free_intervals": [
            {
              "start": 28813,
              "end": 64821,
              "interval_range": 36008
            }
          ],
          "service_time": 504,
          "fixed_service_time": 1800,
          "arrival_time": 34261,
          "departure_time": 36565,
          "distance_cumul": 26008,
          "time_cumul": 36565,
          "weight": -700000,
          "cbm": 0,
          "weight_cumul": 900000.0,
          "cbm_cumul": 0.0
        },
        {
          "index": 2,
          "location_index": 3,
          "working_interval": {
            "start": 28813,
            "end": 64821,
            "interval_range": 36008
          },
          "break_intervals": [

          ],
          "items": [
            {
              "index": 2,
              "quantity": 1,
              "weight": 100000,
              "cbm": 0,
              "quantity_per_pallet": 0,
              "size": {
                "length": 0,
                "width": 0,
                "height": 0
              },
              "config_type": [
                0
              ],
              "vrp_type": 8,
              "request_index": 2,
              "virtual_cbm_coef": [
                0
              ],
              "split_index": -1,
              "one_item_weight": 100000.0,
              "one_item_cbm": 0.0
            },
            {
              "index": 3,
              "quantity": 1,
              "weight": 800000,
              "cbm": 0,
              "quantity_per_pallet": 0,
              "size": {
                "length": 0,
                "width": 0,
                "height": 0
              },
              "config_type": [
                0
              ],
              "vrp_type": 8,
              "request_index": 2,
              "virtual_cbm_coef": [
                0
              ],
              "split_index": -1,
              "one_item_weight": 800000.0,
              "one_item_cbm": 0.0
            }
          ],
          "vrp_type": 2,
          "lat": 10.7551532,
          "lng": 106.6897121,
          "load_coef": -1,
          "free_intervals": [
            {
              "start": 28813,
              "end": 64821,
              "interval_range": 36008
            }
          ],
          "service_time": 648,
          "fixed_service_time": 1800,
          "arrival_time": 37334,
          "departure_time": 39782,
          "distance_cumul": 32176,
          "time_cumul": 39782,
          "weight": -900000,
          "cbm": 0,
          "weight_cumul": 0.0,
          "cbm_cumul": 0.0
        },
        {
          "index": 0,
          "location_index": 0,
          "working_interval": {
            "start": 25230,
            "end": 72036,
            "interval_range": 46806
          },
          "break_intervals": [

          ],
          "items": [

          ],
          "vrp_type": 3,
          "lat": 10.79159458309302,
          "lng": 106.73135407000836,
          "load_coef": 0,
          "free_intervals": [
            {
              "start": 25230,
              "end": 72036,
              "interval_range": 46806
            }
          ],
          "service_time": 0,
          "fixed_service_time": 0,
          "arrival_time": 41981,
          "departure_time": 41981,
          "distance_cumul": 52401,
          "time_cumul": 41981,
          "weight": 0.0,
          "cbm": 0.0,
          "weight_cumul": 0.0,
          "cbm_cumul": 0.0
        }
      ],
      "assigned_interval": {
        "start": 1201,
        "end": 41981,
        "interval_range": 40780
      },
      "over_time": 'false',
      "slack_time": 24029,
      "free_time_rate": 0.48
    }
  ],
  "unassigned_requests": [
    {
      "index": 3,
      "items": [
        {
          "index": 4,
          "quantity": 1,
          "weight": 200000,
          "cbm": 0,
          "quantity_per_pallet": 0,
          "size": {
            "length": 0,
            "width": 0,
            "height": 0
          },
          "config_type": [
            0
          ],
          "vrp_type": 8,
          "request_index": 3,
          "virtual_cbm_coef": [
            0
          ],
          "split_index": -1,
          "one_item_weight": 200000.0,
          "one_item_cbm": 0.0
        }
      ],
      "pickup_location": {
        "index": 0,
        "location_index": 0,
        "working_interval": {
          "start": 25230,
          "end": 72036,
          "interval_range": 46806
        },
        "break_intervals": [

        ],
        "service_time_coef": {
          "fixed_load_time": 1800,
          "fixed_unload_time": 0,
          "load_time_per_ton": 720,
          "unload_time_per_ton": 0,
          "load_time_per_cbm": 360,
          "unload_time_per_cbm": 0
        },
        "config_type": [

        ],
        "vrp_type": 3,
        "free_intervals": [
          {
            "start": 25230,
            "end": 72036,
            "interval_range": 46806
          }
        ],
        "lat": 10.79159458309302,
        "lng": 106.73135407000836,
        "weight": 0,
        "cbm": 0,
        "pallet": 0
      },
      "delivery_location": {
        "index": 3,
        "location_index": 4,
        "working_interval": {
          "start": 28813,
          "end": 64821,
          "interval_range": 36008
        },
        "break_intervals": [

        ],
        "service_time_coef": {
          "fixed_load_time": 0,
          "fixed_unload_time": 1800,
          "load_time_per_ton": 0,
          "unload_time_per_ton": 720,
          "load_time_per_cbm": 0,
          "unload_time_per_cbm": 0
        },
        "config_type": [

        ],
        "vrp_type": 2,
        "free_intervals": [
          {
            "start": 28813,
            "end": 64821,
            "interval_range": 36008
          }
        ],
        "lat": 10.7400256,
        "lng": 106.7137638,
        "weight": 0,
        "cbm": 0,
        "pallet": 0
      },
      "assigned_vehicle": 'null',
      "trip_no": 'null',
      "vrp_type": 7,
      "backhault_requests": 'false',
      "split_index": -1
    }
  ]
}

pair_list = []
assigned_vehicles = data['assigned_vehicles']
route = assigned_vehicles[0]['route']

for i in range(len(route)):
    pair = [route[i]['lat'], route[i]['lng']]
    pair_list.append(pair)



print('pair_list',pair_list)




