/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "6wgjqbz89oqxcvj",
    "created": "2024-08-09 17:12:47.914Z",
    "updated": "2024-08-09 17:12:47.914Z",
    "name": "Competences",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "yn92zflo",
        "name": "Type",
        "type": "select",
        "required": true,
        "presentable": false,
        "unique": false,
        "options": {
          "maxSelect": 1,
          "values": [
            "EAUP",
            "PLANTE",
            "FEU"
          ]
        }
      },
      {
        "system": false,
        "id": "8r3kybgt",
        "name": "Degats",
        "type": "number",
        "required": true,
        "presentable": false,
        "unique": false,
        "options": {
          "min": 0,
          "max": 100,
          "noDecimal": false
        }
      },
      {
        "system": false,
        "id": "td9q3t3u",
        "name": "Precisions",
        "type": "number",
        "required": true,
        "presentable": false,
        "unique": false,
        "options": {
          "min": 0,
          "max": 100,
          "noDecimal": false
        }
      }
    ],
    "indexes": [],
    "listRule": null,
    "viewRule": null,
    "createRule": null,
    "updateRule": null,
    "deleteRule": null,
    "options": {}
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("6wgjqbz89oqxcvj");

  return dao.deleteCollection(collection);
})
