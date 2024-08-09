/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("hmhq2jlyo6g30vy")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "wticaqx7",
    "name": "Competences",
    "type": "relation",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "6wgjqbz89oqxcvj",
      "cascadeDelete": false,
      "minSelect": 0,
      "maxSelect": 4,
      "displayFields": null
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("hmhq2jlyo6g30vy")

  // remove
  collection.schema.removeField("wticaqx7")

  return dao.saveCollection(collection)
})
