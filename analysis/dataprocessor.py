import pandas as pd
import numpy as np
import matplotlib
import random
import os
from sklearn.ensemble import RandomForestRegressor
from sklearn.linear_model import LinearRegression
import seaborn as sns
from sklearn.neighbors import KNeighborsRegressor
from sklearn.tree import DecisionTreeRegressor
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
import tensorflow as tf
keras = tf.keras
layers = tf.keras.layers

matplotlib.use('agg')
import matplotlib.pyplot as plt

# change this value when running as standalone module
global actual_file
actual_file = "./static/datasets/dataset.csv"

global df
df = pd.read_csv(actual_file)

global chart_df
chart_df = pd.read_csv(actual_file)
chart_df["Date"] = pd.to_datetime(chart_df["Date"], format='%m/%d/%Y')

global model_already_generated
model_already_generated = False

standard_weights = [0.1, 0.1, 0.1, 0.1, 0.1, 0.1]
standard_epoch = 10

# Date,population,Gold price,Oil price,S&P index,GNI,Inflation,Realestate index,IT index
def generatePredictionModel(filepath = "./static/datasets/dataset.csv", algorithm="linear", epoch=standard_epoch, custom_weights=standard_weights):
    global df
    df = pd.read_csv(cleanFile(filepath))
    X = [[x1, x2, x3, x4, x5, x6] for x1, x2, x3, x4, x5, x6 in
         zip(df["population"], df["Gold price"], df["Oil price"], df["S&P index"],
             df["GNI"], df["Inflation"])]
    y = [[x1, x2] for x1, x2 in zip(df["Realestate index"], df["IT index"])]
    global model
    if algorithm == "weightage":
        model, score = weightage(epoch, custom_weights)
    else:
        model = choose_algorithm(algorithm)
        model.fit(X, y)
        score = model.score(X, y)
    print("Score of the model:", score)
    global model_already_generated
    model_already_generated = True
    global chart_df
    chart_df = df.copy()
    chart_df["Date"] = pd.to_datetime(chart_df["Date"], format='%m/%d/%Y')
    return score

def choose_algorithm(algorithm):
    if algorithm == "linear":
        return LinearRegression()
    elif algorithm == "decision-tree":
        return DecisionTreeRegressor()
    elif algorithm == "random-forest":
        return RandomForestRegressor()
    elif algorithm == "k-neighbors":
        return KNeighborsRegressor()
    else:
        return LinearRegression()

def weightage(epoch = standard_epoch, custom_weights = standard_weights):
    print(tf.__version__)
    # Features and target variables
    X = df[["population","Gold price","Oil price","S&P index", "GNI", "Inflation"]].values
    y = df[['Realestate index', 'IT index']].values;

    # Define the model
    input_layer = layers.Input(shape=(6,))
    weights = layers.Dense(6, activation='linear', use_bias=False)(input_layer)  # Flexible weights
    weighted_input = layers.multiply([input_layer, weights])  # Element-wise multiplication

    # Neural network layers
    hidden_layer = layers.Dense(64, activation='relu')(weighted_input)
    output_layer = layers.Dense(2)(hidden_layer)  # Output for S&P and NASDAQ indices

    model = keras.Model(inputs=input_layer, outputs=output_layer)

    # Compile the model
    model.compile(optimizer='adam', loss='mean_squared_error', metrics=['accuracy'])

    # Train the model
    model.fit(X, y, epochs=epoch, validation_split=0.2)

    # Example of accessing and adjusting weights after training
    weights_value = model.layers[1].get_weights()[0]  # Get weights from the first Dense layer
    print("Initial Weights:", weights_value)

    # Adjust weights manually if needed
    # For example, you can multiply the weights by a factor
    adjusted_weights = weights_value * np.array([custom_weights])  # Adjust weights for each feature
    model.layers[1].set_weights([adjusted_weights])  # Set the adjusted weights back

    # Re-evaluate the model if necessary

    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
    loss, accuracy = model.evaluate(X_test, y_test)
    print("Accuracy:", accuracy)
    # Your input data as a list
    new_X = [[0.0, 0.0, 0.0, 0.0, 0.0, 0.0]]

    # Convert the list to a NumPy array
    new_X_array = np.array(new_X)

    # Make predictions using the model
    predictions = model.predict(new_X_array)
    print(predictions)
    return model, accuracy

def cleanFile(filepath):
    clean_file = os.path.dirname(filepath)+"dataset-process.csv"
    with open(filepath, 'r') as input_file, open(clean_file, 'w', newline='') as output_file:
        lines = input_file.readlines()
        non_blank_lines = [line for line in lines if line.strip()]
        while non_blank_lines and not non_blank_lines[-1].strip():
            non_blank_lines.pop()
        if non_blank_lines:
            non_blank_lines[-1] = non_blank_lines[-1].rstrip('\n')
        output_file.write(''.join(non_blank_lines))
    return clean_file

def regenerateModel(path, algorithm,epoch=standard_epoch, custom_weights=standard_weights):
    score = generatePredictionModel(path, algorithm,epoch, custom_weights)
    return score

def predictTheValue(population, goldPrice, oilPrice, S_Pindex, GNI, Inflation):
    if not (model_already_generated):
        generatePredictionModel()

    new_X = [[population, goldPrice, oilPrice, S_Pindex, GNI, Inflation]]
    new_X_array = np.array(new_X)
    predictions = model.predict(new_X_array)
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
    fig, ax = plt.subplots(figsize=(10, 6))
    sns.lineplot(x=chart_df["Date"], y=chart_df[param], color=random_color(), ax=ax)
    plt.subplots_adjust(left=0.15, right=0.9, bottom=0.15, top=0.85)
    plt.title("Line Graph of "+param)
    filename = url_prefix + "/static/results/graphs/line-" + param + ".jpg"
    plt.savefig(filename, dpi=500)
    return filename

def getYearVersusBarGraph(param, url_prefix="."):
    plt.rcdefaults()
    plt.clf()
    fig, ax = plt.subplots(figsize=(10, 6))
    sns.barplot(x=chart_df["Date"], y=chart_df[param], data=chart_df, color=random_color(), ax=ax)

    # Skip every n-th tick label
    n = 5  # Adjust the value of n as needed
    labels = ax.get_xticklabels()
    for i, label in enumerate(labels):
        if i % n != 0:
            label.set_visible(False)

    ax.set_xticks(ax.get_xticks()[::n])
    ax.set_xticklabels(chart_df["Date"].dt.year[::n].astype(str), rotation=90, ha='right')

    plt.subplots_adjust(left=0.15, right=0.9, bottom=0.15, top=0.85)
    plt.title("Bar Graph of "+param)
    filename = url_prefix + "/static/results/graphs/bar-" + param + ".jpg"
    plt.savefig(filename, dpi=500)
    return filename

def getYearVersusHeatGraph(param, url_prefix="."):
    plt.rcdefaults()
    plt.clf()
    data_without_timestamp = chart_df.drop(columns=['Date'])
    sns.heatmap(data=data_without_timestamp.corr())
    plt.subplots_adjust(left=0.2, right=0.92, bottom=0.25, top=0.9)
    plt.title("Heat Map")
    filename = url_prefix + "/static/results/graphs/heat-" + param + ".jpg"
    plt.savefig(filename, dpi=500)
    return filename

def getCurrentDataTable():
    if df is None:
        generatePredictionModel()
        return df
    else:
        return df

def getOriginalDataTable():
    with open('./static/datasets/dataset.csv', 'r') as input_file, open('./static/datasets/dataset-temp.csv', 'w', newline='') as output_file:
        lines = input_file.readlines()
        non_blank_lines = [line for line in lines if line.strip()]
        while non_blank_lines and not non_blank_lines[-1].strip():
            non_blank_lines.pop()
        if non_blank_lines:
            non_blank_lines[-1] = non_blank_lines[-1].rstrip('\n')
        output_file.write(''.join(non_blank_lines))
    return pd.read_csv("./static/datasets/dataset-temp.csv")


def main():
    # flexible_attribute()

    # global df
    # df = pd.read_csv("../static/datasets/dataset.csv")
    # print(df)
    generatePredictionModel(filepath="../static/datasets/dataset.csv", algorithm="linear")
    print(predictTheValue(0.0, 0.0, 0.0, 0.0, 0.0, 0.0))

    # Convert the list to a NumPy array
    # getYearVersusGraph('Inflation',"..")
    # predictTheValue(335.8,2026.18,71,4685.05,27562.786,3.4)


if __name__ == '__main__':
    main()