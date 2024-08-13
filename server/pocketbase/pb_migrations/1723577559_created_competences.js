/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "gt2a5d9fl0zg0ad",
    "created": "2024-08-13 19:32:39.433Z",
    "updated": "2024-08-13 19:32:39.433Z",
    "name": "competences",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "2pzs3pby",
        "name": "Name",
        "type": "text",
        "required": true,
        "presentable": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      },
      {
        "system": false,
        "id": "jmgigcmw",
        "name": "Type",
        "type": "select",
        "required": true,
        "presentable": false,
        "unique": false,
        "options": {
          "maxSelect": 1,
          "values": [
            "EAU",
            "FEU",
            "PLANTE"
          ]
        }
      },
      {
        "system": false,
        "id": "8rk5m1e5",
        "name": "Puissance",
        "type": "number",
        "required": true,
        "presentable": false,
        "unique": false,
        "options": {
          "min": null,
          "max": 150,
          "noDecimal": true
        }
      },
      {
        "system": false,
        "id": "8doewiwm",
        "name": "Precision",
        "type": "number",
        "required": true,
        "presentable": false,
        "unique": false,
        "options": {
          "min": null,
          "max": 150,
          "noDecimal": true
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
  const collection = dao.findCollectionByNameOrId("gt2a5d9fl0zg0ad");

  return dao.deleteCollection(collection);
})
