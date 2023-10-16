const file = require("fs");
const { validationResult } = require("express-validator");
const { connected } = require("process");

//fetch request body
function requestData(object, req) {
  try {
    const {
      description,
      onlineProfileLinks,
      heighestQualification,
      dob,
      stateBelongTo,
      currentCity,
      hobbies,
      programmingLanguagesKnown,
      projectsDelivered,
      maxMinTimeTaken,
    } = req.body;

    object.description = description;
    if (onlineProfileLinks) {
      object.onlineProfileLinks = onlineProfileLinks;
    }

    if (heighestQualification) {
      object.heighestQualification = heighestQualification;
    }

    if (dob) {
      object.dob = dob;
    }

    if (stateBelongTo) {
      object.stateBelongTo = stateBelongTo;
    }

    if (currentCity) {
      object.currentCity = currentCity;
    }

    if (hobbies) {
      object.hobbies = hobbies;
    }

    if (programmingLanguagesKnown) {
      object.programmingLanguagesKnown = programmingLanguagesKnown;
    }

    if (projectsDelivered) {
      object.projectsDelivered = projectsDelivered;
    }

    if (maxMinTimeTaken) {
      object.maxMinTimeTaken = maxMinTimeTaken;
    }
    return 0;
  } catch (error) {
    console.log(error);
    return 1;
  }
}

//fetch data for update
function fetchForUpdate(name, jsonFile, req) {
  let object;

  switch (name) {
    case "aboutme":
      object = jsonFile.aboutme.find((item) => item.id === "1");

      break;
    case "experties":
      object = jsonFile.experties.find((item) => item.id === "1");

      break;
    case "projects":
      object = jsonFile.projects.find((item) => item.id === "1");
      break;
    default:
      object = null;
  }

  if (object) {
    const response = requestData(object, req);
    console.log(response);

    return response;
  } else {
    return 1;
  }
}

// update
exports.updateDeveloper = (req, res) => {
  try {
    file.readFile("json-file/developer.json", "utf8", (error, data) => {
      if (error) {
        return res.status(500).json(error);
      }

      const existingData = JSON.parse(data);
      const name = req.params.name;

      const response = fetchForUpdate(name, existingData, req);
      if (response == 1) {
        return res.status(500).json({ error: "Someting  went wrong!" });
      }

      const updatedJson = JSON.stringify(existingData, null, 2);

      // Write the updated JSON back to the file
      file.writeFile("json-file/developer.json", updatedJson, (error) => {
        if (error) {
          return res.status(500).json(error);
        } else {
          return res
            .status(200)
            .json({ success: "Data updated successfully!" });
        }
      });
    });
  } catch (error) {
    return res.status(500).json({ error: "Something went wrong!" });
  }
};

// get
exports.fetchDeveloper = (req, res) => {
  try {
    file.readFile("json-file/developer.json", "utf8", (error, data) => {
      if (error) {
        return res.status(500).json(error);
      }
     return  res.status(200).json(JSON.parse(data));
    });
  } catch (error) {
    return res.status(500).json({ error: "Something went wrong!" });
  }
};
