/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("gt2a5d9fl0zg0ad")

  // update
  collection.schema.addField(new SchemaField({
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
        "Eau",
        "Feu",
        "Plante"
      ]
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("gt2a5d9fl0zg0ad")

  // update
  collection.schema.addField(new SchemaField({
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
  }))

  return dao.saveCollection(collection)
})
