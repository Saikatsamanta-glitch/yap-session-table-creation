
const { sequelizeManager } = require("./managers");
const { EventModel, EventsModel, SessionModel } = sequelizeManager;
const express = require('express');
const app =express();


const searchAndAddToSessions = async (id, searchName) => {
  try {
    const events = await EventModel.findAll({
      attributes: [
        "id",
        "start_date",
        "end_date",
        "start_date_tz_offset",
        "attendance_mode",
        "status",
        "deleted",
        // Add other event attributes as needed
      ],
      where: {
        name: searchName,
      },
    });

    if (events.length === 0) {
      console.log(`No events found with the name '${searchName}'.`);
      return;
    }

    const sessionsData = events.map((event) => ({
      event_id: id,
      start_date: event.start_date,
      end_date: event.end_date,
      start_date_tz_offset: event.start_date_tz_offset,
      attendance_mode: event.attendance_mode,
      status: event.status,
      deleted: event.deleted,
      // Add other session attributes as needed
    }));

    await SessionModel.bulkCreate(sessionsData);
    console.log(
      `Sessions added successfully for events with name '${searchName}'.`
    );
  } catch (error) {
    console.error("Error searching and adding to sessions:", error);
  }
};

const GetAllEventsName = async () => {
  try {
    const eventsData = await EventsModel.findAll({
      sort_by: 'id',
      limit: 100,
      include:[
        {
          model: SessionModel,
          attributes: [
            "id",
            "start_date",
            "end_date",
            "start_date_tz_offset",
            "attendance_mode",
            "status",
            "deleted",
            // Add other session attributes as needed
          ],
        }
      ],
      attributes: [
        "id",
        "name",
        // Add other event attributes as needed
      ],
    });

    // for (const eventData of eventsData) {
    //   console.log("[Id]:", eventData.id, "[searchName]:", eventData.name);
    //   await searchAndAddToSessions(eventData.id, eventData.name);
    // }
    const eventDataList = eventsData.map((event) => event.toJSON());
    return eventDataList;
  } catch (error) {
    console.error("Error getting events data:", error);
  }
};

// Example usage: get all events and add them to sessions

app.get('/sessions', async (req, res) => {
  
  res.json(await GetAllEventsName());
})

app.listen(2023,()=>{
  console.log("Server is running on port 2023");
})