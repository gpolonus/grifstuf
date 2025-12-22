<script>
  import { onMount } from "svelte";
  import { siteTitle } from "$lib/stores";

  let metrics = {}

  const aclInit = () => {
    let accelerometer = null;
    try {
      accelerometer = new Accelerometer({ referenceFrame: "device" });
      accelerometer.addEventListener("error", (event) => {
        // Handle runtime errors.
        if (event.error.name === "NotAllowedError") {
          // Branch to code for requesting permission.
        } else if (event.error.name === "NotReadableError") {
          console.log("Cannot connect to the sensor.");
        }
      });
      accelerometer.addEventListener("reading", () => {
        metrics = {
          x: acl.x,
          y: acl.y,
          z: acl.z
        }
      });
      accelerometer.start();
    } catch (error) {
      // Handle construction errors.
      if (error.name === "SecurityError") {
        // See the note above about permissions policy.
        console.log("Sensor construction was blocked by a permissions policy.");
      } else if (error.name === "ReferenceError") {
        console.log("Sensor is not supported by the User Agent.");
      } else {
        throw error;
      }
    }
  }

  onMount(() => {
    aclInit()
  })

  siteTitle.set('stuf: Accelerameter Metrics')
</script>

<h1> Accelerameter Metrics </h1>

<h3>Will probably only work on Chrome</h3>

<h6>X: {metrics.x}</h6>
<h6>Y: {metrics.y}</h6>
<h6>Z: {metrics.z}</h6>
