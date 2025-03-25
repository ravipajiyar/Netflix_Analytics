from flask import Flask, jsonify
from flask_cors import CORS
import pandas as pd
from textblob import TextBlob

app = Flask(__name__)
CORS(app)

# Load your CSV data
try:
    netflix_shows = pd.read_csv('netflix_titles.csv')
except FileNotFoundError:
    print("Error: netflix_titles.csv not found. Please ensure the CSV file is in the same directory as app.py")
    exit()

def get_maturity_ratings(df):
    x = df.groupby(['M_rating']).size().reset_index(name='counts')
    return x.to_dict(orient='records')

def get_top_directors(df):
    directors_list = df['director'].str.split(',', expand=True).stack()
    directors_list = directors_list.to_frame(name='Director')
    directors = directors_list.groupby(['Director']).size().reset_index(name='Total Count')
    directors = directors[directors.Director != 'Director not specified']
    directors = directors.sort_values(by=['Total Count'], ascending=False)
    top5Directors = directors.head().to_dict(orient='records')
    return top5Directors

def get_top_actors(df):
    df['cast']=df['cast'].fillna('No cast specified')
    cast_df = df['cast'].str.split(',',expand=True).stack().to_frame(name='Actor')
    actors = cast_df.groupby(['Actor']).size().reset_index(name = 'Total Count')
    actors = actors[actors.Actor != 'No cast specified']
    actors = actors.sort_values(by=['Total Count'], ascending=False)
    top5Actors = actors.head().to_dict(orient='records')
    return top5Actors

def get_content_trend(df):
    df1 = df[['type', 'release_year']].rename(columns = {"release_year":"Release Year", "type": "Type"})
    df2 = df1.groupby(['Release Year', 'Type']).size().reset_index(name='Total Count')
    df2 = df2[df2['Release Year']>=2000]
    return df2.to_dict(orient='records')

def get_top_genres(df):
    df['listed_in']=df['listed_in'].fillna('No genre specified')
    genre_df = df['listed_in'].str.split(',',expand=True).stack().to_frame(name='Genre')
    genres = genre_df.groupby(['Genre']).size().reset_index(name = 'Total Count')
    genres = genres[genres.Genre != 'No cast specified']
    genres = genres.sort_values(by=['Total Count'], ascending=False)
    top5Genres = genres.head().to_dict(orient='records')
    return top5Genres
def get_top_genres_by_year(df, year):
   filtered_df = df[df['release_year'] == year]
   return get_top_genres(filtered_df)

def get_sentiment_analysis(df):
    df3 = df[['release_year', 'description']].rename(columns = {'release_year':'Release Year', 'description':'Description'})
    for index, row in df3.iterrows():
        d=row['Description']
        testimonial = TextBlob(d)
        p = testimonial.sentiment.polarity
        if p==0:
            sent = 'Neutral'
        elif p>0:
             sent = 'Positive'
        else:
            sent = 'Negative'
        df3.loc[[index], 'Sentiment']=sent
    df3 = df3.groupby(['Release Year', 'Sentiment']).size().reset_index(name = 'Total Count')
    df3 = df3[df3['Release Year']>2005]
    return df3.to_dict(orient='records')
def get_duration_analysis(df):
    df['duration'] = df['duration'].fillna('No duration specified')
    duration_series = df['duration'].str.split(',', expand=True).stack()
    duration_df = duration_series.reset_index(drop=True).to_frame(name='Duration')
    return duration_df.to_dict(orient='records')
@app.route('/maturity_ratings')
def get_maturity_ratings_route():
    return jsonify(get_maturity_ratings(netflix_shows))

@app.route('/top_directors')
def get_top_directors_route():
    return jsonify(get_top_directors(netflix_shows))
@app.route('/top_directors/<int:year>')
def get_top_directors_by_year(year):
    filtered_df = netflix_shows[netflix_shows['release_year']==year]
    return jsonify(get_top_directors(filtered_df))

@app.route('/top_actors')
def get_top_actors_route():
    return jsonify(get_top_actors(netflix_shows))
@app.route('/top_actors/<int:year>')
def get_top_actors_by_year(year):
    filtered_df = netflix_shows[netflix_shows['release_year']==year]
    return jsonify(get_top_actors(filtered_df))

@app.route('/content_trend')
def get_content_trend_route():
    return jsonify(get_content_trend(netflix_shows))
@app.route('/content_trend/<int:year>')
def get_content_trend_by_year(year):
    filtered_df = netflix_shows[netflix_shows['release_year']==year]
    return jsonify(get_content_trend(filtered_df))

@app.route('/top_genres')
def get_top_genres_route():
    return jsonify(get_top_genres(netflix_shows))
@app.route('/top_genres/<int:year>')
def get_top_genres_by_year_route(year):
  return jsonify(get_top_genres_by_year(netflix_shows, year))

@app.route('/sentiment_analysis')
def get_sentiment_analysis_route():
    return jsonify(get_sentiment_analysis(netflix_shows))

@app.route('/duration_analysis')
def get_duration_analysis_route():
    return jsonify(get_duration_analysis(netflix_shows))

@app.route('/dashboard_data')
def get_dashboard_data():
    dashboard_data = {
      "totalDirectors": len(netflix_shows['director'].dropna().unique()),
        "totalMovies": len(netflix_shows[netflix_shows['type'] == 'Movie']),
        "totalTVShows": len(netflix_shows[netflix_shows['type'] == 'TV Show']),
         "topDirectors": get_top_directors(netflix_shows),
         "contentTrend": get_content_trend(netflix_shows),
        "topGenres": get_top_genres(netflix_shows),
         "sentimentAnalysis": get_sentiment_analysis(netflix_shows),
    }
    return jsonify(dashboard_data)

@app.route('/dashboard_data/<int:year>')
def get_dashboard_data_by_year(year):
   filtered_df = netflix_shows[netflix_shows['release_year']==year]
   dashboard_data = {
      "totalDirectors": len(filtered_df['director'].dropna().unique()),
        "totalMovies": len(filtered_df[filtered_df['type'] == 'Movie']),
        "totalTVShows": len(filtered_df[filtered_df['type'] == 'TV Show']),
         "topDirectors": get_top_directors(filtered_df),
        "contentTrend": get_content_trend(filtered_df),
         "topGenres": get_top_genres(filtered_df),
        "sentimentAnalysis": get_sentiment_analysis(filtered_df)
    }
   return jsonify(dashboard_data)

if __name__ == '__main__':
    app.run(debug=True, port=3001)