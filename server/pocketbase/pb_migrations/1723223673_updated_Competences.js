/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("6wgjqbz89oqxcvj")

  // update
  collection.schema.addField(new SchemaField({
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
        "EAU",
        "PLANTE",
        "FEU"
      ]
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("6wgjqbz89oqxcvj")

  // update
  collection.schema.addField(new SchemaField({
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
  }))

  return dao.saveCollection(collection)
})
