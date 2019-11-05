# Read in the individual .csv files of data
oct18 = read.csv("/Users/gauri_dandi/Documents/Northeastern/2019-2020/DS4200/Project/BlueBikes Data/201810.csv")
nov18 = read.csv("/Users/gauri_dandi/Documents/Northeastern/2019-2020/DS4200/Project/BlueBikes Data/201811.csv")
dec18 = read.csv("/Users/gauri_dandi/Documents/Northeastern/2019-2020/DS4200/Project/BlueBikes Data/201812.csv")
jan19 = read.csv("/Users/gauri_dandi/Documents/Northeastern/2019-2020/DS4200/Project/BlueBikes Data/201901.csv")
feb19 = read.csv("/Users/gauri_dandi/Documents/Northeastern/2019-2020/DS4200/Project/BlueBikes Data/201902.csv")
mar19 = read.csv("/Users/gauri_dandi/Documents/Northeastern/2019-2020/DS4200/Project/BlueBikes Data/201903.csv")
apr19 = read.csv("/Users/gauri_dandi/Documents/Northeastern/2019-2020/DS4200/Project/BlueBikes Data/201904.csv")
may19 = read.csv("/Users/gauri_dandi/Documents/Northeastern/2019-2020/DS4200/Project/BlueBikes Data/201905.csv")
jun19 = read.csv("/Users/gauri_dandi/Documents/Northeastern/2019-2020/DS4200/Project/BlueBikes Data/201906.csv")
jul19 = read.csv("/Users/gauri_dandi/Documents/Northeastern/2019-2020/DS4200/Project/BlueBikes Data/201907.csv")
aug19 = read.csv("/Users/gauri_dandi/Documents/Northeastern/2019-2020/DS4200/Project/BlueBikes Data/201908.csv")
sep19 = read.csv("/Users/gauri_dandi/Documents/Northeastern/2019-2020/DS4200/Project/BlueBikes Data/201909.csv")

# Merge the individual data files into one
all_boston = rbind(oct18, nov18, dec18, jan19, feb19, mar19, apr19, may19, jun19, jul19, aug19, sep19)
all_boston$start_hour = paste(substr(all_boston$starttime, 12, 13), ":00", sep = "")
all_boston$end_hour = paste(substr(all_boston$stoptime, 12, 13), ":00", sep = "")

install.packages("dplyr")
library(dplyr)
count_start_hours = function(x) {
  x %>%
    group_by(start_hour) %>%
    tally();
}

count_end_hours = function(x) {
  x %>%
    group_by(end_hour) %>%
    tally();
}

# Create subsets of the entire data file for the 4 stations of interest to Chester Square
## Tremont St at Northampton St
tremont_northampton_start = subset(all_boston, start.station.id == 364)
tremont_northampton_end = subset(all_boston, end.station.id == 364)

tremont_northampton_start_hour = count_start_hours(tremont_northampton_start)
tremont_northampton_end_hour = count_end_hours(tremont_northampton_end)

## Columbus Ave at Massachusetts Ave
columbus_mass_start = subset(all_boston, start.station.id == 57)
columbus_mass_end = subset(all_boston, end.station.id == 57)

columbus_mass_start_hour = count_start_hours(columbus_mass_start)
columbus_mass_end_hour = count_end_hours(columbus_mass_end)

## South End Library - Tremont St at W Newton St
south_end_lib_start = subset(all_boston, start.station.id == 25)
south_end_lib_end = subset(all_boston, end.station.id == 25)

south_end_lib_start_hour = count_start_hours(south_end_lib_start)
south_end_lib_end_hour = count_end_hours(south_end_lib_end)

## Washington St at Rutland St
wash_rutland_start = subset(all_boston, start.station.id == 39)
wash_rutland_end = subset(all_boston, end.station.id == 39)

wash_rutland_start_hour = count_start_hours(wash_rutland_start)
wash_rutland_end_hour = count_end_hours(wash_rutland_end)

write.csv(all_boston, 
          "/Users/gauri_dandi/Documents/Northeastern/2019-2020/DS4200/Project/project-team-7-bikes/data/all_boston.csv")
write.csv(tremont_northampton_start, 
          "/Users/gauri_dandi/Documents/Northeastern/2019-2020/DS4200/Project/project-team-7-bikes/data/tremont_northampton_start.csv")
write.csv(tremont_northampton_end, 
          "/Users/gauri_dandi/Documents/Northeastern/2019-2020/DS4200/Project/project-team-7-bikes/data/tremont_northampton_end.csv")
write.csv(columbus_mass_start, 
          "/Users/gauri_dandi/Documents/Northeastern/2019-2020/DS4200/Project/project-team-7-bikes/data/columbus_mass_start.csv")
write.csv(columbus_mass_end, 
          "/Users/gauri_dandi/Documents/Northeastern/2019-2020/DS4200/Project/project-team-7-bikes/data/columbus_mass_end.csv")
write.csv(south_end_lib_start, 
          "/Users/gauri_dandi/Documents/Northeastern/2019-2020/DS4200/Project/project-team-7-bikes/data/south_end_lib_start.csv")
write.csv(south_end_lib_end, 
          "/Users/gauri_dandi/Documents/Northeastern/2019-2020/DS4200/Project/project-team-7-bikes/data/south_end_lib_end.csv")
write.csv(wash_rutland_start, 
          "/Users/gauri_dandi/Documents/Northeastern/2019-2020/DS4200/Project/project-team-7-bikes/data/wash_rutland_start.csv")
write.csv(wash_rutland_end, 
          "/Users/gauri_dandi/Documents/Northeastern/2019-2020/DS4200/Project/project-team-7-bikes/data/wash_rutland_end.csv")

write.csv(tremont_northampton_start_hour, 
          "/Users/gauri_dandi/Documents/Northeastern/2019-2020/DS4200/Project/project-team-7-bikes/data/tremont_northampton_start_hour.csv")
write.csv(tremont_northampton_end_hour, 
          "/Users/gauri_dandi/Documents/Northeastern/2019-2020/DS4200/Project/project-team-7-bikes/data/tremont_northampton_end_hour.csv")
write.csv(columbus_mass_start_hour, 
          "/Users/gauri_dandi/Documents/Northeastern/2019-2020/DS4200/Project/project-team-7-bikes/data/columbus_mass_start_hour.csv")
write.csv(columbus_mass_end_hour, 
          "/Users/gauri_dandi/Documents/Northeastern/2019-2020/DS4200/Project/project-team-7-bikes/data/columbus_mass_end_hour.csv")
write.csv(south_end_lib_start_hour, 
          "/Users/gauri_dandi/Documents/Northeastern/2019-2020/DS4200/Project/project-team-7-bikes/data/south_end_lib_start_hour.csv")
write.csv(south_end_lib_end_hour, 
          "/Users/gauri_dandi/Documents/Northeastern/2019-2020/DS4200/Project/project-team-7-bikes/data/south_end_lib_end_hour.csv")
write.csv(wash_rutland_start_hour, 
          "/Users/gauri_dandi/Documents/Northeastern/2019-2020/DS4200/Project/project-team-7-bikes/data/wash_rutland_start_hour.csv")
write.csv(wash_rutland_end_hour, 
          "/Users/gauri_dandi/Documents/Northeastern/2019-2020/DS4200/Project/project-team-7-bikes/data/wash_rutland_end_hour.csv")
