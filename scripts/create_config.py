import csv
import json

RESULT = []

with open("scripts/data/data (2).csv") as f:
    reader = csv.reader(f)

    i = 0
    for row in reader:
        i += 1
        if i > 1:
            result = {}
            
            name = row[0]
            prop_name = row[10]
            l, b = row[3].split()
            dist_ly = row[8]
            abs_magnitude = row[6]
            classification = row[4]

            result.update({
                "name": name,
                "prop_name": prop_name,
                "l": l, 
                "b": b,
                "dist_ly": dist_ly,
                "abs_magnitude": abs_magnitude,
                "classification": classification,
            })
        
            RESULT.append(result)

with open("result.json", "w+") as f:
    json.dump(RESULT, f)