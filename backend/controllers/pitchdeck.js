const uploadImage = require("../firebase/firebase");
const models = require("../models");
const PitchDeck = models.PitchDeck;
const PitchDeckFile = models.PitchDeckFile;
const User = models.User;
const Business = models.Business;
const convertapi = require("convertapi")("TPhdYfkwPg6vaOT1");
const Metrics = models.Metric;
const axios = require("axios");
const Row = models.Row;

const createPitchDeck = async (req, res) => {
  const { id } = req.params;
  const { file } = req.body;
  try {
    const deck = await PitchDeck.create({
      file: file,
      userId: id,
    });

    // Perform the conversion and store the converted files
    const fileType = await getFileType(file);
    let files = [];

    if (fileType === "pdf") {
      const result = await convertapi.convert(
        "webp",
        {
          File: file,
        },
        "pdf"
      );
      files = result.response.Files;

      // Save each file individually in the PitchDeckFile model
      for (const fileData of files) {
        await PitchDeckFile.create({
          file: await uploadImage(fileData.Url, `files/${fileData.FileName}`),
          pitchDeckId: deck.id,
        });
      }
    } else if (fileType === "pptx") {
      const result = await convertapi.convert(
        "webp",
        {
          File: file,
        },
        "pptx"
      );
      files = result.response.Files;

      // Save each file individually in the PitchDeckFile model
      for (const fileData of files) {
        await PitchDeckFile.create({
          file: await uploadImage(fileData.Url, `files/${fileData.FileName}`),
          pitchDeckId: deck.id,
        });
      }
    } else {
      // File type is not supported

      res.status(400).json({ error: "Unsupported file type" });
      return;
    }

    // Return the deck and files as a response
    res.status(200).json({ deck, files });
  } catch (err) {
    res.status(500).json(err);
  }
};

const getPitchDeck = async (req, res) => {
  const { id } = req.params;

  try {
    const deck = await PitchDeck.findOne({
      where: {
        userId: id,
      },
      include: {
        model: PitchDeckFile,
        require: true,
        as: "pitchDeckFiles", // Specify the correct alias for the association
      },
    });

    if (deck) {
      const files = deck.pitchDeckFiles.map((file) => file.file);
      res.status(200).json({ deck, files });
    } else {
      res.status(200).json(deck);
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

const getFileType = async (url) => {
  try {
    const response = await axios.head(url);
    const contentType = response.headers["content-type"];

    if (contentType.includes("pdf")) {
      return "pdf";
    } else if (
      contentType.includes(
        "application/vnd.openxmlformats-officedocument.presentationml.presentation"
      )
    ) {
      return "pptx";
    } else {
      return "unknown";
    }
  } catch (err) {
    return "unknown";
  }
};

const getPitchDecks = async (req, res) => {
  try {
    const data = await User.findAll({
      where: {
        type: "Business",
      },
      include: [
        {
          model: Business,
          required: true,
          include: [
            "employees",
            { model: PitchDeck, required: true, include: ["pitchDeckFiles"] },
            {
              model: Metrics,
              required: false,
              include: [
                {
                  model: Row,
                  as: "rows",
                },
              ],
            },
          ],
        },
      ],
    });

    if (!data) {
      // No PitchDecks found, return an empty array
      res.status(200).json([]);
    } else {
      res.status(200).json(data);
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = { createPitchDeck, getPitchDecks, getPitchDeck };
