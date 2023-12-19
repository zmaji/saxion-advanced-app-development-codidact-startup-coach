FROM mongo:latest

WORKDIR /seeds
COPY seeds/ .

CMD mongoimport --host=mongo --db=codidact-startup-coach-db --collection=companies --type=json --file=Companies.json --jsonArray --mode upsert --upsertFields companyID -u root -p admin --authenticationDatabase=admin --authenticationMechanism SCRAM-SHA-256 && \
  echo "Companies seeded successfully" && \
  mongoimport --host=mongo --db=codidact-startup-coach-db --collection=users --type=json --file=Users.json --jsonArray --mode upsert --upsertFields userID -u root -p admin --authenticationDatabase=admin --authenticationMechanism SCRAM-SHA-256 && \
  echo "Users seeded successfully" && \
  mongoimport --host=mongo --db=codidact-startup-coach-db --collection=roadmaps --type=json --file=Roadmaps.json --jsonArray --mode upsert --upsertFields roadmapID -u root -p admin --authenticationDatabase=admin --authenticationMechanism SCRAM-SHA-256 && \
  echo "Roadmaps seeded successfully" && \
  mongoimport --host=mongo --db=codidact-startup-coach-db --collection=modules --type=json --file=Modules.json --jsonArray --mode upsert --upsertFields moduleID -u root -p admin --authenticationDatabase=admin --authenticationMechanism SCRAM-SHA-256 && \
  echo "Modules seeded successfully" && \
  mongoimport --host=mongo --db=codidact-startup-coach-db --collection=steps --type=json --file=Steps.json --jsonArray --mode upsert --upsertFields stepID -u root -p admin --authenticationDatabase=admin --authenticationMechanism SCRAM-SHA-256 && \
  echo "Steps seeded successfully" && \
  mongoimport --host=mongo --db=codidact-startup-coach-db --collection=companyAnalyses --type=json --file=CompanyAnalyses.json --jsonArray --mode upsert --upsertFields companyAnalysisID -u root -p admin --authenticationDatabase=admin --authenticationMechanism SCRAM-SHA-256 && \
  echo "Company analyses seeded successfully" && \
  mongoimport --host=mongo --db=codidact-startup-coach-db --collection=categories --type=json --file=Categories.json --jsonArray --mode upsert --upsertFields categoryID -u root -p admin --authenticationDatabase=admin --authenticationMechanism SCRAM-SHA-256 && \
  echo "Categories seeded successfully" && \
  mongoimport --host=mongo --db=codidact-startup-coach-db --collection=contents --type=json --file=Contents.json --jsonArray --mode upsert --upsertFields contentID -u root -p admin --authenticationDatabase=admin --authenticationMechanism SCRAM-SHA-256 && \
  echo "Content seeded successfully" && \
  mongoimport --host=mongo --db=codidact-startup-coach-db --collection=labels --type=json --file=Labels.json --jsonArray --mode upsert --upsertFields labelID -u root -p admin --authenticationDatabase=admin --authenticationMechanism SCRAM-SHA-256 && \
  echo "Labels sections seeded successfully" && \
  mongoimport --host=mongo --db=codidact-startup-coach-db --collection=analysisSections --type=json --file=AnalysisSections.json --jsonArray --mode upsert --upsertFields analysisSectionID -u root -p admin --authenticationDatabase=admin --authenticationMechanism SCRAM-SHA-256 && \
  echo "Analysis sections seeded successfully" && \
  mongoimport --host=mongo --db=codidact-startup-coach-db --collection=questionSets --type=json --file=QuestionSets.json --jsonArray --mode upsert --upsertFields questionSetID -u root -p admin --authenticationDatabase=admin --authenticationMechanism SCRAM-SHA-256 && \
  echo "Question sets seeded successfully" && \
  mongoimport --host=mongo --db=codidact-startup-coach-db --collection=questions --type=json --file=Questions.json --jsonArray --mode upsert --upsertFields questionID -u root -p admin --authenticationDatabase=admin --authenticationMechanism SCRAM-SHA-256 && \
  echo "Questions seeded successfully" && \
  mongoimport --host=mongo --db=codidact-startup-coach-db --collection=questionOptions --type=json --file=QuestionOptions.json --jsonArray --mode upsert --upsertFields questionOptionID -u root -p admin --authenticationDatabase=admin --authenticationMechanism SCRAM-SHA-256 && \
  echo "Question options seeded successfully" && \
  mongoimport --host=mongo --db=codidact-startup-coach-db --collection=answers --type=json --file=Answers.json --jsonArray --mode upsert --upsertFields answerID -u root -p admin --authenticationDatabase=admin --authenticationMechanism SCRAM-SHA-256 && \
  echo "Answers seeded successfully"