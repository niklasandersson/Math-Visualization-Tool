SchematicModule.directive('schematicComponent', function() {
  return {
    restrict: 'E',
    scope: {},
    template: '<div draggable="true" class="draggable" id="draggable">Drag me!<button>hej</button></div>',
    link: function(scope, element, attributes, controller) {
      console.log(element);

      var dragComponent = element.children()[0];
      var draggingMe = false;

      function dragStart(event) {
          var style = window.getComputedStyle(event.target, null);
          event.dataTransfer.setData("text/plain",
          (parseInt(style.getPropertyValue("left"),10) - event.clientX) + ',' + (parseInt(style.getPropertyValue("top"),10) - event.clientY));
          draggingMe = true;
      }

      function dragOver(event) {
        event.preventDefault();
        return false;
      }

      function drop(event) {
        if(draggingMe) {
          var offset = event.dataTransfer.getData("text/plain").split(',');
          dragComponent.style.left = (event.clientX + parseInt(offset[0],10)) + 'px';
          dragComponent.style.top = (event.clientY + parseInt(offset[1],10)) + 'px';
          event.preventDefault();
          draggingMe = false;
        }

        return false;
      }

      dragComponent.addEventListener('dragstart', dragStart, false);
      document.body.addEventListener('dragover', dragOver, false);
      document.body.addEventListener('drop', drop, false);

    }
  };
});
