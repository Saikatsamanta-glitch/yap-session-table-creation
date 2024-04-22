const { sequelizeManager } = require("./managers");
const { EventModel, EventsModel } = sequelizeManager; // Assuming you have both models imported

const batchSize = 500; // Number of events to process in each batch

const migrateEvents = async () => {
  try {
    let offset = 0;
    let totalCount = 0;
    const processedEventNames = new Set(); // Set to store processed event names

    do {
      console.log(processedEventNames);
      // Fetch events in batches with specific columns
      const events = await EventModel.findAll({
        attributes: [
          "id",
          "name",
          "name_hash",
          "description",
          "image_url",
          "thumbnail",
          "location_id",
          "category_id",
          "deleted",
        ],
        limit: batchSize,
        offset,
      });

      if (events.length === 0) {
        break; // Exit loop if no more events
      }

      const eventDataList = events.map((event) => event.toJSON()); // Convert Sequelize model instances to JSON

      const uniqueData = eventDataList.reduce((acc, current) => {
        // Check if the 'name' already exists in the accumulator
        const existingItem = acc.find((item) => item.name === current.name);
        if (!existingItem) {
          // If not found, add the current item to the accumulator
          acc.push(current);
        } else {
          // If found, update the 'id' if the current item's 'id' is greater
          if (current.id > existingItem.id) {
            existingItem.id = current.id;
          }
        }
        return acc;
      }, []);

      // Filter out already processed events based on name
      const newEvents = uniqueData.filter(
        (event) => !processedEventNames.has(event.name)
      );

      if (newEvents.length === 0) {
        console.log("No new events to migrate.");
        break; // Exit loop if no new events to migrate
      }

      // Start a transaction for batch processing
      const transaction = await sequelizeManager.sequelize.transaction();

      try {
        // Create records in the events table for the new events
        await EventsModel.bulkCreate(newEvents, { transaction });

        await transaction.commit(); // Commit transaction if successful
        totalCount += newEvents.length; // Update total count processed
        offset += batchSize; // Move offset for next batch

        // Add processed event names to the set
        newEvents.forEach((event) => processedEventNames.add(event.name));
      } catch (error) {
        await transaction.rollback(); // Rollback transaction on error
        throw error; // Rethrow the error to handle it in the calling code if needed
      }
    } while (true);

    console.log(`Total ${totalCount} unique events migrated successfully.`);
  } catch (err) {
    console.error("Error migrating events:", err);
    throw err; // Rethrow the error to handle it in the calling code if needed
  }
};

// Call the async function to migrate unique events
migrateEvents()
  .then(() => {
    console.log("Migration process completed.");
  })
  .catch((err) => {
    console.error("Migration error:", err);
  });
