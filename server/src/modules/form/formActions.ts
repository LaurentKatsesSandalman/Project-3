import type { RequestHandler } from "express";

// Import access to data ??


// The B of BREAD - Browse (Read All) operation
const browse: RequestHandler = async (req, res, next) => {
  try {
    // Fetch all items
    
    // Respond with the items in JSON format
    res.json(forms);
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// The R of BREAD - Read operation
const read: RequestHandler = async (req, res, next) => {
  try {
    // Fetch a specific form based on the provided ID: form

    // If the form is not found, respond with HTTP 404 (Not Found)
    // Otherwise, respond with the form in JSON format
    if (form == null) {
      res.sendStatus(404);
    } else {
      res.json(form);
    }
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// The A of BREAD - Add (Create) operation
const add: RequestHandler = async (req, res, next) => {
  try {
    // Extract the form data from the request body

    // Create the form
    
    // Respond with HTTP 201 (Created) and the ID of the newly inserted form
   
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// The D of BREAD - Delete operation - J'ECRIS deleted ET PAS delete PARCE QUE delete EST UN MOT RESERVE

const deleted: RequestHandler = async (req, res, next) => {
  try {
    //(écrit par Laurent) Trouve l'id à supprimer dans la requete

    // supprime le form concerné

    // répond avec un code 204 ("no content") ou 200 ("ok") ou 202 ("accepted" <= not done yet)
      } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

export default { browse, read, add, deleted };