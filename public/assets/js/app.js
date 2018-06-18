const socket = io();

socket.on('getParents',function(result) {

    $parents = $('#parents');
    $parents.empty();
    var $parentRoot = $(`<li class="mt-2">`);

    for(var i = 0; i < result.length; i++){

        var $parent = `<div class="btn-group", role="group"><button id="button${result[i].parent_id}" data-id="${result[i].parent_id}" data-children="${result[i].children}" data-range-start="${result[i].parent_lower_bound}" data-range-end="${result[i].parent_upper_bound}" type="button" class="btn btn-parent parentBG d-block mb-2" data-toggle="modal" data-target="#editParentNameModal${result[i].parent_id}"><strong>${result[i].parent_name}</strong></button><button id="button${result[i].parent_id}" data-id="${result[i].parent_id}" data-children="${result[i].children}" data-range-start="${result[i].parent_lower_bound}" data-range-end="${result[i].parent_upper_bound}" type="button" class="btn btn-default d-block mb-2" data-toggle="modal" data-target="#editChildrenModal${result[i].parent_id}"><strong>&#x2261;</strong></button></div>

        <div id="editParentNameModal${result[i].parent_id}" class="modal" role="dialog">
            <div class="modal-dialog">
          
              <!-- Modal content-->
              <div class="modal-content">
                <div class="modal-header">
                  <h4 class="modal-title"> edit${result[i].parent_name} name</h4>
                  <button type="button" class="close" data-dismiss="modal">&times;</button>
                </div>
                <div class="modal-body">
                    <div class="row"><input id="editParentName${result[i].parent_id}" required value="${result[i].parent_name}" class="form-control"/></div>
                </div>
                <div class="modal-footer">
                    <button id="editParentNameButton" class="btn btn-success my-1 mr-1" onclick="editParent(${result[i].parent_id})" data-dismiss="modal">save name</i></button>
                    <button onclick="deleteItem(${result[i].parent_id})" class="btn btn-warning node-delete my-1 mr-1" data-dismiss="modal">delete parent</button>
                    <button type="button" class="btn btn-danger" data-dismiss="modal">close</button>
                </div>
              </div>
          
            </div>
          </div>

          <div id="editChildrenModal${result[i].parent_id}" class="modal" role="dialog">
            <div class="modal-dialog">
          
              <!-- Modal content-->
              <div class="modal-content">
                <div class="modal-header">
                  <h4 class="modal-title">edit ${result[i].parent_name} factories</h4>
                  <button type="button" class="close" data-dismiss="modal">&times;</button>
                </div>
                <div class="modal-body">
                    <div class="container mb-2"><div class="row"><input id="numChildren${result[i].parent_id}" required value="${result[i].children}" class="form-control input-md mb-3" type="number" min="0" max="15" placeholder="Number of factories"><div class="input-group mb-3"><div class="input-group-prepend"><span class="input-group-text parentBG">Range</span></div><input required id="rangeLowerBound${result[i].parent_id}" type="number" class="form-control" placeholder="Min" value="${result[i].parent_lower_bound}"><input required id="rangeUpperBound${result[i].parent_id}" type="number" class="form-control" placeholder="Max" value="${result[i].parent_upper_bound}"></div>
                </div>
                <div class="modal-footer">
                    <button id="nodeSubmit" onClick="editFactories(${result[i].parent_id})" class="btn btn-success" data-dismiss="modal"><strong>submit</strong></button>
                    <button type="button" class="btn btn-danger" data-dismiss="modal">close</button>
                </div>
              </div>
          
            </div>
            </div>`
          
        $($parentRoot).append($parent);
        //console.log(result[i])
        if (parseInt(result[i].children) !== null && parseInt(result[i].children) > 0) {
            //console.log(result[i].children)
            var $factoryParent = $(`<ul>`);
            var child = result[i].childrenData;
            //console.log(result[i].children)
            for(x = 0; x < child.length; x++){
                //console.log(child[x])

                var $factory = `<li><button type="button" class="btn btn-info d-block mb-2 text-center">${child[x].child_number}</button></li>`
                $($factoryParent).append($factory);
            }

            $($parentRoot).append($factoryParent);
        }
    }

    $parents.append($parentRoot);
});

socket.emit("getParents");

$("#addParentModal").on('click', "#parentSubmit", function() 
{
    var $inputNode = $("#inputRootItem");
    var $newName = $inputNode.val().trim();
    var $emptyParent = $("#emptyParent");
    var pattern = new RegExp(/^\w+$/);
    isValidInput = pattern.test($newName);

    if ($newName === "") {
        $emptyParent.show();
    } else if (!isValidInput) {
        var $invalidParent = $("#invalidParent");
        $invalidParent.show();
        $inputNode = "";
    } else {
        socket.emit("addParent", $newName);
    }

});

function deleteItem(parentID){
    
    //console.log(parentID);
    var id = parentID;
    //console.log(id);
    socket.emit('deleteParent',id);
};

function editParent(parentID) {

    var $editedName = document.getElementById("editParentName" + parentID).value;
    var $emptyParent = $("#emptyParent");
    var $invalidParent = $("#invalidParent");
    var pattern = new RegExp(/^\w+$/);
    isValidInput = pattern.test($editedName);

    if (!isValidInput) {
        $invalidParent.show();
    } else if ($editedName === ""){
        $emptyParent.show();
    }
    else {
        //console.log($editedName);
        socket.emit("updateParentName", $editedName, parentID);
    }
    
};

function editFactories(parentID) {

    var $childrenLowerBound = document.getElementById("rangeLowerBound" + parentID).value
    var $childrenUpperBound = document.getElementById("rangeUpperBound" + parentID).value
    var $numChildren = document.getElementById("numChildren" + parentID).value
    //console.log($numChildren);
    var $invalidRange = $('#invalidRange');
    var $invalidChildren = $('#invalidChildren');

    if ($numChildren !== "" && $numChildren !== NaN && $numChildren <= 15 && $numChildren >= 1) {
        if ($childrenLowerBound !== "" && $childrenUpperBound !== "" && $childrenLowerBound <= $childrenUpperBound) {
            socket.emit('createChildren', parentID, $childrenLowerBound, $childrenUpperBound, $numChildren);
        } else {
            $invalidRange.show();
        }
    } else {
        $invalidChildren.show();
    }
    // console.log($childrenLowerBound)
    // console.log($childrenUpperBound)
    // console.log($numChildren)
    
}

$("[data-hide]").on("click", function() {
    $(this).closest("." + $(this).attr("data-hide")).hide();
});