FROM mongo:4.4

WORKDIR /seeds
COPY seeds/ .

CMD mongoimport --host=${MONGO_HOST} --db=${MONGO_DB_NAME} --collection=companies --type=json --file=Companies.json --jsonArray --mode upsert --upsertFields companyID -u ${MONGO_USER} -p ${MONGO_PASSWORD} --authenticationDatabase=${MONGO_AUTH_DB} --authenticationMechanism SCRAM-SHA-256 && \
  echo "Companies seeded successfully" && \
  mongoimport --host=${MONGO_HOST} --db=${MONGO_DB_NAME} --collection=users --type=json --file=Users.json --jsonArray --mode upsert --upsertFields userID -u ${MONGO_USER} -p ${MONGO_PASSWORD} --authenticationDatabase=${MONGO_AUTH_DB} --authenticationMechanism SCRAM-SHA-256 && \
  echo "Users seeded successfully" && \
  mongoimport --host=${MONGO_HOST} --db=${MONGO_DB_NAME} --collection=roadmaps --type=json --file=Roadmaps.json --jsonArray --mode upsert --upsertFields roadmapID -u ${MONGO_USER} -p ${MONGO_PASSWORD} --authenticationDatabase=${MONGO_AUTH_DB} --authenticationMechanism SCRAM-SHA-256 && \
  echo "Roadmaps seeded successfully" && \
  mongoimport --host=${MONGO_HOST} --db=${MONGO_DB_NAME} --collection=modules --type=json --file=Modules.json --jsonArray --mode upsert --upsertFields moduleID -u ${MONGO_USER} -p ${MONGO_PASSWORD} --authenticationDatabase=${MONGO_AUTH_DB} --authenticationMechanism SCRAM-SHA-256 && \
  echo "Modules seeded successfully" && \
  mongoimport --host=${MONGO_HOST} --db=${MONGO_DB_NAME} --collection=steps --type=json --file=Steps.json --jsonArray --mode upsert --upsertFields stepID -u ${MONGO_USER} -p ${MONGO_PASSWORD} --authenticationDatabase=${MONGO_AUTH_DB} --authenticationMechanism SCRAM-SHA-256 && \
  echo "Steps seeded successfully" && \
  mongoimport --host=${MONGO_HOST} --db=${MONGO_DB_NAME} --collection=companyAnalyses --type=json --file=CompanyAnalyses.json --jsonArray --mode upsert --upsertFields companyAnalysisID -u ${MONGO_USER} -p ${MONGO_PASSWORD} --authenticationDatabase=${MONGO_AUTH_DB} --authenticationMechanism SCRAM-SHA-256 && \
  echo "Company analyses seeded successfully" && \
  mongoimport --host=${MONGO_HOST} --db=${MONGO_DB_NAME} --collection=categories --type=json --file=Categories.json --jsonArray --mode upsert --upsertFields categoryID -u ${MONGO_USER} -p ${MONGO_PASSWORD} --authenticationDatabase=${MONGO_AUTH_DB} --authenticationMechanism SCRAM-SHA-256 && \
  echo "Categories seeded successfully" && \
  mongoimport --host=${MONGO_HOST} --db=${MONGO_DB_NAME} --collection=contents --type=json --file=Contents.json --jsonArray --mode upsert --upsertFields contentID -u ${MONGO_USER} -p ${MONGO_PASSWORD} --authenticationDatabase=${MONGO_AUTH_DB} --authenticationMechanism SCRAM-SHA-256 && \
  echo "Content seeded successfully" && \
  mongoimport --host=${MONGO_HOST} --db=${MONGO_DB_NAME} --collection=contentUsers --type=json --file=ContentUsers.json --jsonArray --mode upsert --upsertFields userID,contentID -u ${MONGO_USER} -p ${MONGO_PASSWORD} --authenticationDatabase=${MONGO_AUTH_DB} --authenticationMechanism SCRAM-SHA-256 && \
  echo "ContentUsers seeded successfully" && \
  mongoimport --host=${MONGO_HOST} --db=${MONGO_DB_NAME} --collection=contentFeedback --type=json --file=ContentFeedback.json --jsonArray --mode upsert --upsertFields feedbackID -u ${MONGO_USER} -p ${MONGO_PASSWORD} --authenticationDatabase=${MONGO_AUTH_DB} --authenticationMechanism SCRAM-SHA-256 && \
  echo "ContentFeedback seeded successfully" && \
  mongoimport --host=${MONGO_HOST} --db=${MONGO_DB_NAME} --collection=labels --type=json --file=Labels.json --jsonArray --mode upsert --upsertFields labelID -u ${MONGO_USER} -p ${MONGO_PASSWORD} --authenticationDatabase=${MONGO_AUTH_DB} --authenticationMechanism SCRAM-SHA-256 && \
  echo "Labels seeded successfully" && \
  mongoimport --host=${MONGO_HOST} --db=${MONGO_DB_NAME} --collection=contentLabels --type=json --file=ContentLabels.json --jsonArray --mode upsert --upsertFields labelID,contentID -u ${MONGO_USER} -p ${MONGO_PASSWORD} --authenticationDatabase=${MONGO_AUTH_DB} --authenticationMechanism SCRAM-SHA-256 && \
  echo "ContentLabels seeded successfully" && \
  mongoimport --host=${MONGO_HOST} --db=${MONGO_DB_NAME} --collection=analysisSections --type=json --file=AnalysisSections.json --jsonArray --mode upsert --upsertFields analysisSectionID -u ${MONGO_USER} -p ${MONGO_PASSWORD} --authenticationDatabase=${MONGO_AUTH_DB} --authenticationMechanism SCRAM-SHA-256 && \
  echo "Analysis sections seeded successfully" && \
  mongoimport --host=${MONGO_HOST} --db=${MONGO_DB_NAME} --collection=questionSets --type=json --file=QuestionSets.json --jsonArray --mode upsert --upsertFields questionSetID -u ${MONGO_USER} -p ${MONGO_PASSWORD} --authenticationDatabase=${MONGO_AUTH_DB} --authenticationMechanism SCRAM-SHA-256 && \
  echo "Question sets seeded successfully" && \
  mongoimport --host=${MONGO_HOST} --db=${MONGO_DB_NAME} --collection=questions --type=json --file=Questions.json --jsonArray --mode upsert --upsertFields questionID -u ${MONGO_USER} -p ${MONGO_PASSWORD} --authenticationDatabase=${MONGO_AUTH_DB} --authenticationMechanism SCRAM-SHA-256 && \
  echo "Questions seeded successfully" && \
  mongoimport --host=${MONGO_HOST} --db=${MONGO_DB_NAME} --collection=questionOptions --type=json --file=QuestionOptions.json --jsonArray --mode upsert --upsertFields questionOptionID -u ${MONGO_USER} -p ${MONGO_PASSWORD} --authenticationDatabase=${MONGO_AUTH_DB} --authenticationMechanism SCRAM-SHA-256 && \
  echo "Question options seeded successfully" && \
  mongoimport --host=${MONGO_HOST} --db=${MONGO_DB_NAME} --collection=answers --type=json --file=Answers.json --jsonArray --mode upsert --upsertFields answerID -u ${MONGO_USER} -p ${MONGO_PASSWORD} --authenticationDatabase=${MONGO_AUTH_DB} --authenticationMechanism SCRAM-SHA-256 && \
  echo "Answers seeded successfully"