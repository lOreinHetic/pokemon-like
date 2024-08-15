/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("kq23xy8q8tyo7zs")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "jvl8ns3z",
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
  const collection = dao.findCollectionByNameOrId("kq23xy8q8tyo7zs")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "jvl8ns3z",
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
