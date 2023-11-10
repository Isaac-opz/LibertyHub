import pandas as pd
import plotly.express as px
import plotly.graph_objects as go
from sklearn.metrics import mean_squared_error, r2_score
from sklearn.linear_model import LinearRegression
from sklearn.model_selection import train_test_split
import numpy as np

# Load the data
data = pd.read_csv('db\datoskny.csv') 

# Exploratory plots
# Scatter plot for 'precio' vs 'opiniones_por_mes' with 'calificacion' as size of markers
fig_opiniones_precio = px.scatter(data, x='precio', y='opiniones_por_mes',
                                  size='calificacion', color='distrito',
                                  hover_data=['nombre', 'barrio'],
                                  title='Precio vs Opiniones por Mes (Tamaño indica Calificación)')

# Scatter plot for 'precio' vs 'calificacion' with 'numero_opiniones' as size of markers
fig_calificacion_precio = px.scatter(data, x='precio', y='calificacion',
                                     size='numero_opiniones', color='distrito',
                                     hover_data=['nombre', 'barrio'],
                                     title='Precio vs Calificación (Tamaño indica Número de Opiniones)')

# Bar plot for 'distrito' showing the average 'precio', 'calificacion', and 'opiniones_por_mes'
avg_metrics_by_distrito = data.groupby('distrito').agg({'precio':'mean', 'calificacion':'mean', 'opiniones_por_mes':'mean'}).reset_index()
fig_avg_metrics_distrito = px.bar(avg_metrics_by_distrito, x='distrito', y=['precio', 'calificacion', 'opiniones_por_mes'],
                                  title='Métricas promedio por Distrito')

# Box plot to show distribution of 'precio' across 'tipo_habitacion'
fig_precio_tipo_habitacion = px.box(data, x='tipo_habitacion', y='precio',
                                     color='tipo_habitacion',
                                     title='Distribución de Precio por Tipo de Habitación')

# Box plot to show distribution of 'calificacion' across 'tipo_habitacion'
fig_calificacion_tipo_habitacion = px.box(data, x='tipo_habitacion', y='calificacion',
                                           color='tipo_habitacion',
                                           title='Distribución de Calificación por Tipo de Habitación')

# Regression analysis
# Selecting the features and target variable for the regression model
X = data[['calificacion', 'minimo_noches', 'numero_opiniones', 'opiniones_por_mes', 'propiedades_del_anfitrion', 'dias_habiles']]
y = data['precio']

# Splitting the dataset into training and testing sets
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Create a Linear Regression model and fit it to the training data
lm = LinearRegression()
lm.fit(X_train, y_train)

# Predict on the testing data
y_pred = lm.predict(X_test)

# Calculate R-squared and RMSE for the model
r2 = r2_score(y_test, y_pred)
rmse = np.sqrt(mean_squared_error(y_test, y_pred))

# Plotting actual vs predicted prices to visualize the model performance
regression_results_fig = go.Figure()
regression_results_fig.add_trace(go.Scatter(x=y_test, y=y_pred, mode='markers', name='Predicted vs Actual'))
regression_results_fig.add_trace(go.Line(x=y_test, y=y_test, name='Actual Price Line'))
regression_results_fig.update_layout(title=f'Real vs Predicted Prices with R^2: {r2:.2f} and RMSE: {rmse:.2f}',
                                     xaxis_title='Actual Price',
                                     yaxis_title='Predicted Price',
                                     showlegend=True)

# Show all the plots
fig_opiniones_precio.show()
fig_calificacion_precio.show()
fig_avg_metrics_distrito.show()
fig_precio_tipo_habitacion.show()
fig_calificacion_tipo_habitacion.show()
regression_results_fig.show()
