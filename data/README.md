The data acquired from https://www.bluebikes.com/system-data, containing multiple xlsx files for each separate month from October 2018 to September 2019, was merged into a single xlsx file. It contains each BlueBike’s trip duration in seconds, start time and date, stop time and date, start station id and name, start station latitude and longitude, end station id and name, end station latitude and longitude, bike id, user type (either a single user or regular member), user birth year, user gender, and an added column for the year and month.

Data attributes:
- Trip duration in seconds (quantitative),
- Start time and date (ordinal)
- Stop time and date (ordinal)
- Start station id (categorical)
- Start station name (categorical)
- Start station latitude (quantitative)
- Start station longitude (quantitative)
- End station id (categorical)
- End station name (categorical)
- End station latitude (quantitative)
- End station longitude (quantitative)
- Bike ID (categorical)
- User type (categorical)
- Birth year (ordinal)
- Gender (categorical)

Files in data folder:
- all_boston.csv -- data for all Bluebike stations in Boston
- columbus_mass_end.csv -- data for trips that end at the Columbus Ave @ Mass Ave station
- columbus_mass_start.csv -- data for trips that start at the Columbus Ave @ Mass Ave station
- south_end_lib_end.csv -- data for trips that end at the South End Library station
- south_end_lib_start.csv -- data for trips that start at the South End Library station
- tremont_northampton_end.csv -- data for trips that end at the Tremont St @ Northampton St station
- tremont_northampton_start.csv -- data for trips that start at the Tremont St @ Northampton St station
- wash_rutland_end.csv -- data for trips that end at the Washington St @ Rutland St station
- wash_rutland_start.csv -- data for trips that start at the Washington St @ Rutland St station