const express = require("express");
const morgan = require("morgan");
const dotenv = require("dotenv");
const ApiError = require("./utils/apiError");
const dbConnection = require("./config/database");
const categoryRoutes = require("./routes/categoryRoutes");
const globalErrorHandler = require("./middlewares/errorMiddleware");
dotenv.config({ path: "config.env" });
const app = express();
app.use(express.json());

// database connection
dbConnection();

// app Express
const PORT = process.env.PORT || 3000;
// middleware
if (process.env.NODE_ENV === "development") {
    app.use(morgan("dev"));
    console.log(`mode: ${process.env.NODE_ENV} , morgan enabled...`);
}
// mount routes
app.use("/api/v1/categories", categoryRoutes);
app.all("*", (request, response, next) => {
    // response.status(404).json({ message: error.message });
    next(new ApiError(`can't find this route: ${request.originalUrl}`, 400));
});

// global error handler middleware
app.use(globalErrorHandler);

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});

app.get("/", (request, response) => {
    response.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Image to Masked Text</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                background-color: #f4f4f4;
                text-align: center;
                margin: 0;
                padding: 20px;
                display: flex;
                justify-content: center;
                align-items: center;
                height: 100vh;
            }

            .container {
                width: 100%;
                max-width: 800px;
            }

            .image-grid {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
                gap: 20px;
                max-width: 800px;
                margin: auto;
                padding: 20px;
            }

            .grid-item {
                position: relative;
                width: 100%;
                height: 250px;
                display: flex;
                justify-content: center;
                align-items: center;
                border-radius: 10px;
                box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
                cursor: pointer;
                transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
                overflow: hidden;
            }

            .grid-item img {
                width: 100%;
                height: 100%;
                object-fit: cover;
                border-radius: 10px;
                transition: opacity 0.3s ease-in-out;
            }

            .masked-text {
                position: absolute;
                font-size: 80px;
                font-weight: bold;
                text-transform: uppercase;
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
                background-size: cover;
                background-position: center;
                display: none;
                transition: opacity 0.3s ease-in-out;
            }
        </style>
    </head>
    <body>

        <div class="container">
            <h1>Click an image 👇</h1>
            <div class="image-grid">
                <div class="grid-item" data-image="https://media.istockphoto.com/id/814423752/photo/eye-of-model-with-colorful-art-make-up-close-up.jpg?s=612x612&w=0&k=20&c=l15OdMWjgCKycMMShP8UK94ELVlEGvt7GmB_esHWPYE=">
                    <img src="https://media.istockphoto.com/id/814423752/photo/eye-of-model-with-colorful-art-make-up-close-up.jpg?s=612x612&w=0&k=20&c=l15OdMWjgCKycMMShP8UK94ELVlEGvt7GmB_esHWPYE=" alt="Image">
                    <div class="masked-text">Khaled</div>
                </div>
                <div class="grid-item" data-image="https://images.unsplash.com/photo-1575936123452-b67c3203c357?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D">
                    <img src="https://images.unsplash.com/photo-1575936123452-b67c3203c357?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Image">
                    <div class="masked-text">Khaled</div>
                </div>
                <div class="grid-item" data-image="https://plus.unsplash.com/premium_photo-1664474619075-644dd191935f?q=80&w=1738&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D">
                    <img src="https://plus.unsplash.com/premium_photo-1664474619075-644dd191935f?q=80&w=1738&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Image">
                    <div class="masked-text">Khaled</div>
                </div>
            </div>
        </div>

        <script>
            document.addEventListener("DOMContentLoaded", function () {
                const gridItems = document.querySelectorAll(".grid-item");

                gridItems.forEach((item) => {
                    const img = item.querySelector("img");
                    const text = item.querySelector(".masked-text");

                    item.addEventListener("click", function () {
                        // Set the background of the text to the clicked image
                        text.style.backgroundImage = \`url(\${item.dataset.image})\`;
                        text.style.display = "block"; 
                        text.style.width = "100%";  
                        text.style.height = "100%";  
                        text.style.position = "absolute";  
                        text.style.display = "flex";  
                        text.style.justifyContent = "center";  
                        text.style.alignItems = "center";  
                        
                        // Hide the image
                        img.style.opacity = "0";
                    });
                });
            });
        </script>

    </body>
    </html>
`);
});
