import csv
import json
import re

RESULT = []
COLORS = {}
SIZES = {}

if __name__ == "__main__":

    with open("scripts/data/data (2).csv") as f:
        reader = csv.reader(f)

        i = 0
        for row in reader:
            i += 1
            if i > 1:
                curr_result = {}
                
                name = row[0]
                prop_name = row[10]
                l, b = row[3].split()
                dist_ly = row[8]
                abs_magnitude = row[6]
                classification = row[4]

                extracted_class = re.split(r"\+|-|\.", classification)[0][:2]

                print(f"\nClassifying number: {i}")
                if not extracted_class in COLORS:
                    print(f"Classify this: {extracted_class}")

                    correct=False
                    while not correct:
                        color = input("Define color: ").strip()
                        size = input("Define size in solar sizes: ").strip()

                        # Ensure correct values.
                        if color in [
                            "blue",
                            "white_blue",
                            "white",
                            "yellow_white",
                            "yellow",
                            "orange",
                            "red",
                        ]:
                            try:
                                float(size)
                                correct = True
                            except:
                                correct = False

                    COLORS[extracted_class] = color
                    SIZES[extracted_class] = size

                curr_result.update({
                    "name": name,
                    "prop_name": prop_name,
                    "l": l, 
                    "b": b,
                    "dist_ly": dist_ly,
                    "abs_magnitude": abs_magnitude,
                    "classification": classification,
                    "texture": f"{COLORS[extracted_class]}_sun.jpg",
                    "solar_size": SIZES[extracted_class],
                })
            

                RESULT.append(curr_result)


    with open("result.json", "w+") as f:
        json.dump(RESULT, f)

    with open("colors.json", "w+") as f:
        json.dump(COLORS, f)

    with open("sizes.json", "w+") as f:
        json.dump(SIZES, f)
