var data = {
	"IsTruncated": false,
	"Marker": "",
	"Contents": [
		{
			"Key": "Waiting/reecestafford-at-cscope.co.uk/1646133718415/Europe-London/275856 MXL4  [From 01-04-18 to 09-07-18] [09072018145121].cdf",
			"LastModified": "2022-03-01T11:22:00.000Z",
			"ETag": "\"4b6c23fa7d6df31165c0b55142a0e697\"",
			"Size": 1194,
			"StorageClass": "STANDARD",
			"Owner": {
				"ID": "5c33ef4c1258ed508b6eba835c6888e653597a98360226e6499418296a576f4f"
			}
		},
		{
			"Key": "Waiting/reecestafford-at-cscope.co.uk/1646133718415/Europe-London/275856 MXL4  [From 01-04-18 to 09-07-18] [09072018145121].cdf.lock",
			"LastModified": "2022-03-01T11:22:00.000Z",
			"ETag": "\"d41d8cd98f00b204e9800998ecf8427e\"",
			"Size": 0,
			"StorageClass": "STANDARD",
			"Owner": {
				"ID": "5c33ef4c1258ed508b6eba835c6888e653597a98360226e6499418296a576f4f"
			}
		}
	],
	"Name": "dev1-cscope.info.cdf.parts",
	"Prefix": "Waiting/",
	"MaxKeys": 1000,
	"CommonPrefixes": []
}

var contents = data.Contents.sort(function(lhs, rhs) {
	return lhs.Size - rhs.Size;
})

// console.log(contents)

for (var loadFileIndex in contents) {
	var thisLoadFileKey = contents[loadFileIndex].Key;
	for (var lockFileIndex in contents) {
		var thisLockFileKey = contents[lockFileIndex].Key;
		if (!thisLoadFileKey.includes(".lock") && thisLoadFileKey + ".lock" === thisLockFileKey) {
			contents.splice(loadFileIndex, 1); // remove this item, it is locked
			contents.splice(lockFileIndex, 1); // remove the lock for this item, it has been checked
			break;
		}
	}
}

console.log(contents)

