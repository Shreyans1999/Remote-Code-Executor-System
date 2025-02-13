const util = require("util");
const fs = require("fs");
const exec = util.promisify(require("child_process").exec);

const cpp = (fileName, input, res) => {
  console.log("this cpp file runs");
  fs.writeFile(`${fileName}.txt`, input, (err) => {
    if (err) {
      console.log(err);
      res.json({ err: err });
      return;
    }
    
    // Remove -it flags and use -d only for detached mode
    exec(`docker run -d cpp:v1 tail -f /dev/null`).then((response) => {
      const container_id = response.stdout.substring(0, 12);
      console.log(container_id);
      
      exec(
        `docker cp ${fileName}.cpp ${container_id}:/usr/cpp && docker cp ${fileName}.txt ${container_id}:/usr/cpp`
      )
        .then(() => {
          exec(
            `docker exec ${container_id} sh -c "g++ ${fileName}.cpp -o ./a && ./a<${fileName}.txt"`
          )
            .then((resp) => {
              console.log(resp);
              res.status(201).json(resp);
              // Clean up files and container
              cleanup(container_id, fileName);
            })
            .catch((err) => {
              console.log(err);
              res.json({ stderr: err.stderr });
              cleanup(container_id, fileName);
            });
        })
        .catch((err) => {
          console.log(err);
          res.json({ stderr: err.stderr });
          cleanup(container_id, fileName);
        });
    }).catch(err => {
      console.error("Failed to create container:", err);
      res.status(500).json({ error: "Container creation failed" });
      // Clean up only files since container creation failed
      cleanup(null, fileName);
    });
  });
};

// Helper function to clean up resources
const cleanup = async (containerId, fileName) => {
  try {
    if (containerId) {
      await exec(`docker rm -f ${containerId}`);
    }
    await Promise.all([
      fs.promises.unlink(`${fileName}.cpp`),
      fs.promises.unlink(`${fileName}.txt`)
    ]);
    console.log("Cleanup completed successfully");
  } catch (err) {
    console.error("Cleanup error:", err);
  }
};

module.exports = cpp;
