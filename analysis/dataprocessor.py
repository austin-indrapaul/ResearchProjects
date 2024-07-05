import pandas as pd
import matplotlib
import random
from sklearn.linear_model import LinearRegression
import seaborn as sns

matplotlib.use('agg')
import matplotlib.pyplot as plt

df = pd.read_csv("./static/datasets/dataset.csv")

# df = pd.read_csv("../static/datasets/dataset.csv")

global model_already_generated
model_already_generated = False


# Date,population,Gold price,Oil price,S&P index,GNI,Inflation,Realestate index,IT index
def generatePredictionModel():
    X = [[x1, x2, x3, x4, x5, x6] for x1, x2, x3, x4, x5, x6 in
         zip(df["population"], df["Gold price"], df["Oil price"], df["S&P index"],
             df["GNI"], df["Inflation"])]
    y = [[x1, x2] for x1, x2 in zip(df["Realestate index"], df["IT index"])]
    global model
    model = LinearRegression()
    model.fit(X, y)
    score = model.score(X, y)
    print("Score of the model:", score)
    global model_already_generated
    model_already_generated = True

def regenerateModel():
    global df
    df = pd.read_csv("./static/datasets/dataset.csv")
    generatePredictionModel()

def predictTheValue(population, goldPrice, oilPrice, S_Pindex, GNI, Inflation):
    if not (model_already_generated):
        generatePredictionModel()

    new_X = [[population, goldPrice, oilPrice, S_Pindex, GNI, Inflation]]
    predictions = model.predict(new_X)
    print(predictions)

    curr_realestate_index = round(predictions[0][0], 4)
    curr_ITindex = round(predictions[0][1], 4)

    last_year = df['Date'].iloc[-1]
    last_realestate_index = df['Realestate index'].iloc[-1]
    last_ITindex = df['IT index'].iloc[-1]

    return_message = ""
    if curr_realestate_index > last_realestate_index:
        return_message += f"Realestate index is greater than previous year ({last_year} : {last_realestate_index}) which is \"" + str(
            curr_realestate_index) + "\""
    elif curr_realestate_index < last_realestate_index:
        return_message += f"Realestate index is lesser than previous year ({last_year} : {last_realestate_index}) which is \"" + str(
            curr_realestate_index) + "\""
    else:
        return_message += f"Realestate index is same as previous year {last_year} which is \"" + str(curr_realestate_index) + "\""

    return_message += "\n"

    if curr_ITindex > last_ITindex:
        return_message += f"IT index is greater than previous year ({last_year} : {last_ITindex}) which is \"" + str(
            curr_ITindex) + "\""
    elif curr_ITindex < last_ITindex:
        return_message += f"IT index is lesser than previous year ({last_year} : {last_ITindex}) which is \"" + str(
            curr_ITindex) + "\""
    else:
        return_message += f"IT index is same as previous year {last_year} which is \"" + str(curr_ITindex) + "\""

    print(return_message)
    return return_message

def random_color():
    r = random.randint(0, 127)
    g = random.randint(0, 127)
    b = random.randint(0, 127)
    return f"#{r:02x}{g:02x}{b:02x}";

def getYearVersusGraph(param, url_prefix="."):
    images_path = []
    images_path.append(getYearVersusLineGraph(param, url_prefix))
    images_path.append(getYearVersusBarGraph(param, url_prefix))
    images_path.append(getYearVersusHeatGraph(param, url_prefix))
    return images_path

def getYearVersusLineGraph(param, url_prefix="."):
    plt.rcdefaults()
    plt.clf()
    df["Date"] = pd.to_datetime(df["Date"], format='%m/%d/%Y')
    fig, ax = plt.subplots(figsize=(10, 6))
    sns.lineplot(x=df["Date"], y=df[param], color=random_color(), ax=ax)
    plt.subplots_adjust(left=0.15, right=0.9, bottom=0.15, top=0.85)
    plt.title("Line Graph of "+param)
    filename = url_prefix + "/static/results/graphs/line-" + param + ".jpg"
    plt.savefig(filename, dpi=500)
    return filename

def getYearVersusBarGraph(param, url_prefix="."):
    plt.rcdefaults()
    plt.clf()
    df["Date"] = pd.to_datetime(df["Date"], format='%m/%d/%Y')
    fig, ax = plt.subplots(figsize=(10, 6))
    sns.barplot(x=df["Date"], y=df[param], data=df, color=random_color(), ax=ax)

    # Skip every n-th tick label
    n = 5  # Adjust the value of n as needed
    labels = ax.get_xticklabels()
    for i, label in enumerate(labels):
        if i % n != 0:
            label.set_visible(False)

    ax.set_xticks(ax.get_xticks()[::n])
    ax.set_xticklabels(df["Date"].dt.year[::n].astype(str), rotation=90, ha='right')

    plt.subplots_adjust(left=0.15, right=0.9, bottom=0.15, top=0.85)
    plt.title("Bar Graph of "+param)
    filename = url_prefix + "/static/results/graphs/bar-" + param + ".jpg"
    plt.savefig(filename, dpi=500)
    return filename

def getYearVersusHeatGraph(param, url_prefix="."):
    plt.rcdefaults()
    plt.clf()
    data_without_timestamp = df.drop(columns=['Date'])
    sns.heatmap(data=data_without_timestamp.corr())
    plt.subplots_adjust(left=0.2, right=0.92, bottom=0.25, top=0.9)
    plt.title("Heat Map")
    filename = url_prefix + "/static/results/graphs/heat-" + param + ".jpg"
    plt.savefig(filename, dpi=500)
    return filename


if __name__ == '__main__':
    generatePredictionModel()
    # getYearVersusGraph('Inflation',"..")
    # predictTheValue(335.8,2026.18,71,4685.05,27562.786,3.4)
