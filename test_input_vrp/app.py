import datetime
import json
import math
import random as rd
import string
from pprint import pprint



def time_interval_random(working_time, working_time_ratio, random_time_ratio, interval_range=2):
    work_start = datetime.datetime.strptime(working_time["start"], "%Y-%m-%d %H:%M:%S")
    work_end = datetime.datetime.strptime(working_time["end"], "%Y-%m-%d %H:%M:%S")
    delta_working_time = work_end - work_start
    seed = rd.random()
    if seed < working_time_ratio:
        return [working_time]
    elif seed < working_time_ratio + random_time_ratio:
        random_hours = rd.randint(0, delta_working_time.seconds // 3600 - interval_range)
        hour_start = work_start + datetime.timedelta(hours=random_hours)
        hour_end = hour_start + datetime.timedelta(hours=interval_range)
        value = {
            "start": hour_start.strftime("%Y-%m-%d %H:%M:%S"),
            "end": hour_end.strftime("%Y-%m-%d %H:%M:%S")
        }
        return [value]
    else:
        return []

def random_matrix(base_value, list_type1, type_name1, list_type2=[], type_name2="", random_stg='cost'):
    matrix = []

    if len(list_type2) == 0 and type_name2 == "":

        for i in range(len(list_type1)):
            temp = {type_name1: list_type1[i], "value": base_value}
            if random_stg == 'cost':
                base_value += math.ceil(base_value * (rd.randint(30, 80) / 100))
            matrix.append(temp)
    else:
        for i in range(len(list_type1)):
            for j in range(len(list_type2)):
                temp = {type_name1: list_type1[i], type_name2: list_type2[j]}
                if i == j:
                    temp["value"] = base_value
                elif random_stg == 'cost':
                    temp["value"] = base_value * rd.randint(8, 30)
                elif random_stg == 'binary':
                    temp["value"] = rd.randint(0, 1)
                elif random_stg == 'time':
                    temp["value"] = time_interval_random(base_value[0], 0.1, 0.3, 1)

                matrix.append(temp)

    return matrix

if __name__ == "__main__":

    master_data_path1 = r'C:\nosense\test_linh_tinh\note\test_input_vrp\master_data.json'

    with open(master_data_path1) as f:
        data = json.load(f)
        vehicle_categories = data["vehicle_categories"]
        vehicle_type = data["vehicle_type"]
        depot_type = data["depot_type"]
        customer_type = data["customer_type"]
        matrix_outline = data["matrix_outline"]
        item_type = data["item_type"]

    dict_for_fucking_name = {
            "vehicleType": {
                "name": "typeOfVehicle",
                "value_set": vehicle_type,
            },
            "customerType": {
                "name": "typeOfCustomer",
                "value_set": customer_type,
            },
            "depotType": {
                "name": "typeOfDepot",
                "value_set": depot_type,
            },
            "itemType": {
                "name": "typeOfItem",
                "value_set": item_type
            }
        }

    # print('matrix_outline1', matrix_outline)

    for key, relation in matrix_outline.items():

        print("key", key) 
        print("relation", relation) 

        # for key_c, constraints in relation.items():
        #     params = []
        #     # print(constraints)
        #     for key_t, any_type in constraints["referenceType"].items():
        #         list_type = dict_for_fucking_name[key_t]["value_set"][any_type]
        #         type_name = dict_for_fucking_name[key_t]["name"]
        #         params.append(list_type)
        #         params.append(type_name)
        #     base_value = constraints["base_value"]
        #     try:
        #         random_stg = constraints["random_stg"]
        #         del constraints["random_stg"]
        #     except:
        #         random_stg = 'cost'
        #     constraints["matrix"] = random_matrix(constraints["base_value"], *params, random_stg=random_stg)
        #     del constraints["base_value"]

    # print('matrix_outline2',matrix_outline)