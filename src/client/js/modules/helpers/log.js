export default function log (data, label = "label:") {
	console.group(label)
	console.log(data)
	console.groupEnd()
}