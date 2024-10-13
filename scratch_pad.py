


def test_eval_function_forumla():
    value = 16.6667
    formula = input("Enter a formula (use 'input' for current value to be substituted):\n")
    print("Entered formula: ", formula)
    formula = formula.replace("input", str(value))
    print("After substitution, formula: ", formula)
    print(eval(formula))


def test_eval_function_condition():
    value = "5"
    formula = input("Enter a formula (use 'input' for current value to be substituted):\n")
    if formula.lower().__contains__("none") or formula.lower().__contains__("null"):
        print("Not valid")
    else:
        print("Entered formula: ", formula)
        formula = formula.replace("input", str(value))
        print("After substitution, formula: ", formula)
        print(eval(formula))

# from openai import OpenAI
#
# if __name__ == '__main__':
#     API_KEY = "sk-my-test-vyAoM4HJCF0F423uvnChT3BlbkFJrcu2V2Z4Y2JQ9G080lTB"
#
#     client = OpenAI(api_key = API_KEY)
#     headers = {
#         "x-ratelimit-limit-tokens": "10"
#     }
#     stream = client.chat.completions.create(
#         model="gpt-4-turbo",
#         messages=[{"role": "user", "content": "Say this is a test"}],
#         stream=True,
#         headers=headers
#     )
#
# import requests
#
# def my_custom_function():
#     url = "https://api.worldnewsapi.com/search-news?text=population&language=en"
#     api_key = "860da77fdb19487abff1da00f21ccfaf"
#
#     headers = {
#         'x-api-key': api_key
#     }
#
#     response = requests.get(url, headers=headers)
#
#     if response.status_code == 200:
#         return response.json()
#     else:
#         return f"Error: {response.status_code}"
#
# if __name__ == "__main__":
#     print(my_custom_function()['news'][0]['title'])

import requests
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


def flexible_attribute(filepath = "../static/datasets/dataset.csv", algorithm="linear"):
    print(tf.__version__)
    global df
    df = pd.read_csv("./static/datasets/dataset.csv")
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
    model.fit(X, y, epochs=10, validation_split=0.2)

    # Example of accessing and adjusting weights after training
    weights_value = model.layers[1].get_weights()[0]  # Get weights from the first Dense layer
    print("Initial Weights:", weights_value)

    # Adjust weights manually if needed
    # For example, you can multiply the weights by a factor
    adjusted_weights = weights_value * np.array([[1.0], [1.0], [1.0], [1.0], [1.0], [1.0]])  # Adjust weights for each feature
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

if __name__ == "__main__":
    flexible_attribute()


    # api_url = "https://api.obviously.ai/v1/predict"
    # csv_data = open("../static/datasets/dataset.csv", "rb").read()
    # response = requests.post(api_url, data=csv_data)
    #
    # prediction_results = response.json()
    # print(prediction_results)


    # response = Completion.create(
    #     engine="text-davinci-003",
    #     prompt="Once upon a time",
    #     max_tokens=100
    # )
    #
    # print(response.choices[0].text.strip())


# read the data from any format
# add headers if not present
# replace values based on a function
# replace the null/0/etc. values with standard ones
# remove the entire row based on condition
# truncate the no of rows
# write the data to any format
# https://chezo.uno/blog/2017-01-09_tabula-py--extract-table-from-pdf-into-python-dataframe-6c7acfa5f302/


# receive file input path

# enter conditions to remove the row
# input<0, input=NULL

# enter conditions to rplace the data in row
# input<0, input=NULL

# receive file output path
