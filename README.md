# Job Matching Application

## Overview

This is a simple job-matching web application that matches users' bios with available job listings based on job titles.
It fetches job data and user data from a backend API and attempts to match users with relevant job listings using basic keyword matching.

## Installation and Running Instructions for frontend

```bash
# Install dependencies
npm install
#Run the app
npm run dev
# Edit backend IP
Edit your localhost ip accordingly in App.tsx

```

## Installation and Running Instructions for backend

```bash
# Install venv in backend
cd backend
python3 -m venv .  venv
#Activate the venv
. .venv/bin/activate
# Install backend dependencies
pip install -r requirements.txt
#Run backend api with flask. (Use debug for hot reloading)
flask --app fetch run --debug
```

## Challenges:

### Cors errors required setting up a backend api

I was surprised about this requirement given the suggested languages were Javascript (which suggested a purely frontend task) The Flask api was very quick to setup though.

### Fuzzy Matching of text string to job title

This was on the surface an easy challenge. However I soon realized matching the job titles to strings in the bio would not be simple.
The user bios contained various keywords that did not directly match the job title, so I opted for a loose matching approach
A brute force method may have made matching easier but Eg. searching for strings and variants more exhaustively.
I chose a refined pared back approach to meet time requirements

### Fuzzy matching of location

Again this seemed easy but I would have had to filter locations based on the previous words to determine whether the user was moving TO or FROM that destination. For this reason I removed location from the search.
I considered adding a 'partial match' class for UI if location keyword showed in bio but that would exclude people with No location in bio

### Perfomance considerations of fuzzy matches

Searching strings and substrings could be quite costly performance wise so I used useMemo hook to stop unnessesary computations.
I chose not to use reactQuery just because of time and size of app constraints

### Frontend

I created a super simple frontend component to display the data.
Future optimisations would be pagination, caching and UI changes based on result state

## Considerations

I considered creating an array of Job titles and variants and matching against that - but given the time constraints decided not to.
I also considered making an api call to an LLM like chat gpt to get a Natural language filter for these keywords giving my job title matches more chance.

Im sure there would also be a library that could have handled the search/match better but I decided against 3rd party tools.
Considered using a .env but kept it simple.

