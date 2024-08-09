/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "hmhq2jlyo6g30vy",
    "created": "2024-08-09 16:53:51.258Z",
    "updated": "2024-08-09 16:53:51.258Z",
    "name": "Pokemon",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "ovxi94l2",
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
        "id": "5lbwcmgg",
        "name": "PV",
        "type": "number",
        "required": true,
        "presentable": false,
        "unique": false,
        "options": {
          "min": 0,
          "max": 100,
          "noDecimal": true
        }
      },
      {
        "system": false,
        "id": "rkkituou",
        "name": "Type",
        "type": "select",
        "required": true,
        "presentable": false,
        "unique": false,
        "options": {
          "maxSelect": 1,
          "values": [
            "EAU",
            "PLANTE",
            "FEU"
          ]
        }
      },
      {
        "system": false,
        "id": "obu9lq4t",
        "name": "ATK",
        "type": "number",
        "required": true,
        "presentable": false,
        "unique": false,
        "options": {
          "min": 0,
          "max": 100,
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
  const collection = dao.findCollectionByNameOrId("hmhq2jlyo6g30vy");

  return dao.deleteCollection(collection);
})
