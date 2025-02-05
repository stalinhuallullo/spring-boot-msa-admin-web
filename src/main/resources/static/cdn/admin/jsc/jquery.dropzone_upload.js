
(function() {
  var $, DefaultOptions, DropZoneError, actions, empty, extract, ifWrongFileParams, imageAction, prettyJoin, uploadImageFiles, uploadQuery;

  $ = jQuery;

  DefaultOptions = {
    url: null,
    action: null,
    multiUploading: true,
    ifWrongFile: "show",
    maxFileSize: Number.POSITIVE_INFINITY,
    fileNameMatcher: /.*/,
    fileMimeTypeMatcher: /.*/,
    wrapperForInvalidFile: function(fileIndex) {
      return "<p>File: \"" + this.files[fileIndex].name + "\" doesn't support</p>'";
    },
    validateEach: function(fileIndex) {
      return true;
    },
    validateAll: function(files) {
      return files;
    },
    uploadBegin: function(fileIndex, blob) {},
    uploadEnd: function(fileIndex, blob) {},
    done: function() {},
    ajaxSettings: function(settings, fileIndex, blob) {}
  };

  ifWrongFileParams = ["nothing", "error", "show", "ignore"];

  DropZoneError = function(message) {
    return this.message = message;
  };

  DropZoneError.prototype = new Error;

  extract = function(field, self, args) {
    if (typeof field === "function") {
      return field.apply(self, args);
    } else {
      return field;
    }
  };

  empty = function() {};

  $.fn.withDropZone = function(dropZone, options) {
    var fileInput, key, value, workers;
    if (this.attr("type") !== "file") {
      throw new DropZoneError("You should call this method only on input[type=file] and send dropZone as argument");
    }
    if (!(dropZone instanceof $)) {
      dropZone = $(dropZone);
    }
    if (options) {
      for (key in DefaultOptions) {
        value = DefaultOptions[key];
        if (!options.hasOwnProperty(key)) {
          options[key] = value;
        }
      }
      if (!options.ifWrongFile) {
        options.ifWrongFile = "show";
      } else if (ifWrongFileParams.indexOf(options.ifWrongFile) < 0) {
        throw new DropZoneError('"ifWrongFile" should has one of these values: "nothing", "error", "show", "ignore"');
      }
      if (!options.formData) {
        if (options.multiUploading) {
          options.formData = function(fileIndex, blob, filename) {
            var formData;
            formData = new FormData;
            formData.set(this.name, blob, filename);
            return formData;
          };
        } else {
          options.formData = function(blobs, filenames) {
            var formData, i, j, ref;
            formData = new FormData;
            for (i = j = 0, ref = blobs.length; 0 <= ref ? j < ref : j > ref; i = 0 <= ref ? ++j : --j) {
              formData.append(this.name, blobs[i], filenames[i]);
            }
            return formData;
          };
        }
      }
    } else {
      options = {};
    }
    workers = [];
    fileInput = this.get(0);
    dropZone.on("dragenter", function() {
      return dropZone.addClass('hover');
    }).on("dragleave", function(e) {
      return dropZone.removeClass('hover');
    }).on('dragover', function(e) {
      return e.preventDefault();
    }).on("drop", function(e) {
      e.preventDefault();
      fileInput.files = e.originalEvent.dataTransfer.files;
      return uploadImageFiles(this, fileInput, workers, fileInput.files, options);
    }).on("click", function() {
      return fileInput.click();
    });
    this.on("change", function() {
      return uploadImageFiles(dropZone[0], this, workers, this.files, options);
    });
    return {
      upload: function() {
        var j, len, results, worker;
        results = [];
        for (j = 0, len = workers.length; j < len; j++) {
          worker = workers[j];
          results.push(worker());
        }
        return results;
      },
      waitingToUploadCount: function() {
        return workers.length;
      }
    };
  };

  uploadImageFiles = function(dropZone, fileInput, workers, files, options) {
    var accept, action, actionOption, anyIsInvalid, blobs, dotPos, droppedFiles, ext, file, filenames, i, ignore, isValid, isValidFile, j, k, kids, len, mimeTypeMatcher, msize, multiUploading, name, nameMatcher, preview, previewContainer, progressBar, ref, uploadNext, uploadedFilesCount;
    workers.length = 0;
    dropZone.classList.remove('hover');
    dropZone.classList.remove('drop');
    dropZone.classList.remove('error');
    previewContainer = dropZone.getElementsByClassName("preview-container")[0];
    if (previewContainer) {
      previewContainer.innerHTML = "";
    }
    if (files.length === 0) {
      return;
    }
    droppedFiles = [];
    if (!fileInput.multiple) {
      files = files.slice(0, 1);
    }
    accept = (fileInput.accept || "").split(",").map(function(accept) {
      return "(" + (accept.replace('*', '.*')) + ")";
    }).join("|");
    accept = new RegExp(accept);
    files = options.validateAll.call(fileInput, (function() {
      var j, len, results;
      results = [];
      for (j = 0, len = files.length; j < len; j++) {
        file = files[j];
        results.push(file);
      }
      return results;
    })());
    isValidFile = [];
    nameMatcher = options.fileNameMatcher;
    mimeTypeMatcher = options.fileMimeTypeMatcher;
    msize = options.maxFileSize;
    anyIsInvalid = false;
    for (j = 0, len = files.length; j < len; j++) {
      file = files[j];
      isValid = options.validateEach(file) && accept.test(file.type) && nameMatcher.test(file.name) && mimeTypeMatcher.test(file.type) && msize >= file.size;
      isValidFile.push(isValid);
      if (!isValid) {
        anyIsInvalid = true;
      }
    }
    if (anyIsInvalid) {
      if (options.ifWrongFile === "error") {
        fileInput.value = null;
        dropZone.classList.add('error');
        return;
      }
      if (options.ifWrongFile === "nothing") {
        fileInput.value = null;
        return;
      }
    }
    dropZone.classList.add('drop');
    if (previewContainer) {
      previewContainer.innerHTML = "";
    } else {
      previewContainer = document.createElement("div");
      previewContainer.className = "preview-container";
      dropZone.append(previewContainer);
    }
    multiUploading = options.multiUploading;
    blobs = [];
    filenames = new Array(files.length);
    uploadedFilesCount = 0;
    ignore = options.ifWrongFile === "ignore";
    for (i = k = 0, ref = files.length; 0 <= ref ? k < ref : k > ref; i = 0 <= ref ? ++k : --k) {
      if (!isValidFile[i] && ignore) {
        continue;
      }
      
    let file = files[i]
    let fileIndex = i
    let wrapper = document.createElement("div")
    let preview
    let progressBar
    ;
      wrapper.className = "wrapper uploading";
      previewContainer.append(wrapper);
      if (!isValidFile[i]) {
        wrapper.classList.add("invalid");
        wrapper.innerHTML = options.wrapperForInvalidFile.call(fileInput, fileIndex);
        continue;
      }
      wrapper.innerHTML = '<div class="preview"></div>\n<div class="file-name"></div>\n<div class="file-uploader-progress-bar">\n  <div class="progress"></div>\n</div>';
      kids = wrapper.children;
      preview = kids[0];
      kids[1].textContent = file.name;
      progressBar = kids[2].children[0];
      uploadNext = function(blob) {
        return workers.push(function() {
          var formDataResult, process;
          process = function(progress) {
            progressBar.style.width = 100 * progress.loaded / progress.total + "%";
            return options.process.call(fileInput, progress, fileIndex, blob);
          };
          if (multiUploading) {
            formDataResult = options.formData.call(fileInput, fileIndex, blob, filenames[fileIndex]);
            return uploadQuery(options, formDataResult, filenames[fileIndex], fileInput, fileIndex, blob, process).done(function() {
              wrapper.classList.remove("uploading");
              options.uploadEnd.call(fileInput, filenames[fileIndex], fileIndex, blob);
              if (++uploadedFilesCount === files.length) {
                return options.done.call(fileInput, filenames);
              }
            });
          } else {
            blobs.push(blob);
            if (++uploadedFilesCount === files.length) {
              formDataResult = options.formData.call(fileInput, blobs, filenames);
              return uploadQuery(options, formDataResult, filenames, fileInput, "(multiUploading must be true)", blobs, process).done(function() {
                options.uploadEnd.call(fileInput, filenames, fileIndex, blob);
                return options.done.call(fileInput, filenames);
              });
            }
          }
        });
      };
      filenames[fileIndex] = file.name;
      actionOption = extract(options.action, fileInput, [i]);
      if (actionOption) {
        action = actions[actionOption.name];
        if (typeof action !== "function") {
          if (actionOption.name == null) {
            throw new DropZoneError('Please, specify "name" in "action" block');
          }
          throw new DropZoneError("There'no action with name \"" + actionOption.name + "\"");
        }
        if (actionOption.rename) {
          dotPos = file.name.indexOf(".");
          if (dotPos < 0) {
            name = file.name;
            ext = "";
          } else {
            name = file.name.substr(0, dotPos);
            ext = file.name.substr(dotPos);
          }
          filenames[fileIndex] = actionOption.rename.call(fileInput, name, ext, fileIndex);
        }
        if (!actionOption.params) {
          throw new DropZoneError('You should specify "params" in "action" option');
        }
        action(options, actionOption.params, preview, file, uploadNext);
      } else {
        uploadNext(file);
      }
    }
    return null;
  };

  uploadQuery = function(options, formDataResult, filename, fileInput, fileIndex, blob, loadingProgressCallback) {
    var settings;
    options.uploadBegin.call(fileInput, filename, fileIndex, blob);
    settings = {
      method: "POST",
      cache: false,
      contentType: false,
      processData: false,
      data: formDataResult,
      xhr: function() {
        var xhr;
        xhr = new XMLHttpRequest;
        xhr.upload.onprogress = loadingProgressCallback;
        return xhr;
      }
    };
    options.ajaxSettings.call(fileInput, settings, fileIndex, filename, blob);
    if (!settings.url) {
      settings.url = options.url;
    }
    return $.ajax(settings);
  };

  prettyJoin = function(sequence, delimiter, lastDelimiter) {
    var i, j, last, ref, result;
    if (sequence.length === 0) {
      return "";
    }
    if (sequence.length === 1) {
      return sequence[0];
    }
    result = [];
    for (i = j = 0, ref = sequence.length - 2; 0 <= ref ? j < ref : j > ref; i = 0 <= ref ? ++j : --j) {
      result.push(sequence[i]);
    }
    last = sequence[sequence.length - 2] + lastDelimiter + sequence[sequence.length - 1];
    return result.join(delimiter) + last;
  };

  imageAction = function(options, params, preview, file, blobCallback) {
    var canvas, convertTo, img, reader;
    convertTo = params.convertTo;
    img = new Image;
    canvas = document.createElement("canvas");
    img.onload = function(e) {
      var h, maxHeight, maxWidth, quality, w;
      if (params.preview) {
        preview.append(canvas);
      }
      w = this.width;
      h = this.height;
      if (!convertTo) {
        canvas.width = w;
        canvas.height = h;
        canvas.getContext("2d").drawImage(this, 0, 0, w, h);
        blobCallback(file);
        return;
      }
      if (convertTo.maxWidth || convertTo.maxHeight) {
        maxWidth = convertTo.maxWidth || this.width;
        maxHeight = convertTo.maxHeight || this.height;
        if (typeof maxWidth === "string") {
          maxWidth = Number(maxWidth);
        }
        if (typeof maxHeight === "string") {
          maxHeight = Number(maxHeight);
        }
        if (w > maxWidth) {
          w = maxWidth;
          h *= w / this.width;
          if (h > maxHeight) {
            h = maxHeight;
            w = this.width * h / this.height;
          }
        } else if (h > maxHeight) {
          h = maxHeight;
          w *= h / this.height;
          if (w > maxWidth) {
            w = maxWidth;
            h = this.height * w / this.width;
          }
        }
        if (convertTo.width && convertTo.width < maxWidth) {
          w = convertTo.width;
        }
        if (convertTo.height && convertTo.height < maxHeight) {
          h = convertTo.height;
        }
      } else {
        if (convertTo.width) {
          w = convertTo.width;
        }
        if (convertTo.height) {
          h = convertTo.height;
        }
      }
      canvas.width = w;
      canvas.height = h;
      canvas.getContext("2d").drawImage(this, 0, 0, w, h);
      quality = convertTo.qualityArgument;
      if ((!quality || quality == 1) && w === this.width && h === this.height && file.type !== convertTo.mimeType) {
        blobCallback(file);
        return;
      }
      quality = quality === 1 ? 1.1 : Number(quality);
      return canvas.toBlob(blobCallback, convertTo.mimeType || file.type, quality);
    };
    reader = new FileReader;
    reader.onloadend = function(e) {
      return img.src = e.target.result;
    };
    return reader.readAsDataURL(file);
  };

  actions = $.fn.withDropZone.actions = {
    image: imageAction
  };

}).call(this);