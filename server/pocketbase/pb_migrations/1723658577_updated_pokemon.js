/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("kq23xy8q8tyo7zs")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "r9vnxpms",
    "name": "Image",
    "type": "file",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "mimeTypes": [],
      "thumbs": [],
      "maxSelect": 1,
      "maxSize": 5242880,
      "protected": false
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("kq23xy8q8tyo7zs")

  // remove
  collection.schema.removeField("r9vnxpms")

  return dao.saveCollection(collection)
})
