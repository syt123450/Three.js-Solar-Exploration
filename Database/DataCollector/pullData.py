import requests
import json

apiKey = "7bf4b70bc924b2a03ef3258073d4fdbe"

naturalGas = "&category_id=2134424" #Gross Natural Gas Reserve data endpoint
crudeOil = "&category_id=2134984" #Crude Oil Proved Reserve data endpoint
coal = "&category_id=2241589" #Coal Reserves data endpoint

countryList = [] #List of countries with Natural Gas Reserve Data

# UI to choose which fuel data to get
# TODO Capability to pull multiple fuel data asynchronously
print("Enter 1 for Natural Gas, 2 for Crude Oil, 3 for Coal")
userInput = input()

options = {1: [naturalGas, "naturalGas"],
            2: [crudeOil, "crudeOil"],
            3: [coal, "coal"]}

choice = options[int(userInput)][0]
# print (choice)

#Grabbing country codes and putting them into listOfCountries array, doesnt work for coal
def grabCountries(endPoint):
    response = requests.get("http://api.eia.gov/category/?api_key=" + apiKey + endPoint)
    jsonRes = response.json()
    for i in range(len(jsonRes["category"]["childseries"])):
        if jsonRes["category"]["childseries"][i]['units'] == jsonRes["category"]["childseries"][0]['units']:
            countryList.append(jsonRes["category"]["childseries"][i]['series_id'])

def writeToFile(countryList):
    # Using the first country's endpoint to get Fuel type and Unit
    response = requests.get("http://api.eia.gov/series/?api_key=" + apiKey + "&series_id=" + countryList[0])

    fuel = response.json()["series"][0]["name"].split(", ")[0]
    units = response.json()["series"][0]["units"]

    data = []
    # data["Request"] = {}
    # data["Request"] = ({"Fuel": fuel, "Units": units})
    # data["Result"] = []

    #Pulling data, parsing and writing to a json file in the end
    for i in range(len(countryList)):
        response = requests.get("http://api.eia.gov/series/?api_key=" + apiKey + "&series_id=" + countryList[i])
        PjsonRes = response.json()
        country = PjsonRes["series"][0]["name"].split(", ")[1]
        grabedData = PjsonRes["series"][0]["data"]
        for j in range(len(grabedData)):
            grabedData[j].insert(0, country)
            grabedData[j][1] = int(grabedData[j][1])
            if isinstance( grabedData[j][2], float ):
                pass
            else:
                grabedData[j][2] = 0
        data.append(grabedData)

    with open(options[int(userInput)][1]+'.json', 'w') as outfile:
        json.dump(data, outfile)

    print(json.dumps(data, indent = 4))

grabCountries(choice)
writeToFile(countryList)
