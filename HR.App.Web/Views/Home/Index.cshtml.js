import Vue from 'vue';
import Dropzone from 'vue2-dropzone';

document.addEventListener('DOMContentLoaded', function (event) {
    let view = new Vue({
        el: document.getElementById('view'),
        components: {
            "dropzone": Dropzone
        },
        data: {
            message: 'This is the index page',
            useUploadOptions: true,
            uploadOptions: {
                acceptedFiles: '.png,.jpg,.pdf',
                dictDefaultMessage: 'To upload the file click here. Or, drop a file here e.',
                maxFiles: 10,
                maxFileSizeInMB: 20,
                addRemoveLinks: true
            }
        },
        methods: {
            onUploaded: function (file, response) {
                if (response.status === "OK" || response.status === "200") {
                    console.log('Successfully uploaded!');
                }
                else {
                    this.isVisible = false;
                    console.log(response.message);
                }
            },
            onUploadError: function (file, message, xhr) {
                console.log("Message ====> " + JSON.stringify(message));
            }
        }
    });
});