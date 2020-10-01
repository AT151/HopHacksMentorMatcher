import csv

with open('MentorData.csv') as csv_file:
    reader = csv.DictReader(csv_file)
    mentors = []
    for line in reader:
        mentors.append(line)
    print(mentors)