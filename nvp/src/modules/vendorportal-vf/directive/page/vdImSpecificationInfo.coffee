angular.module("vdImSpecificationInfo",[])
.directive("vdImSpecificationInfo",["$filter","itemCreationAPI",($filter,itemCreationAPI) ->
    restrict : "E"
    template :'
    <div class="row no-margin" style="max-height:200px;overflow: scroll;overflow: auto;">
        <table class="table table-bordered table-striped table-condensed dashboard-table">
            <thead >
                <tr>
                    <th style="width: 15%">{{ \'view_specification.groupName\' | translate }}
                    </th>
                    <th style="width: 30%">{{ \'view_specification.property\' | translate }}
                    </th>
                    <th style="width: 55%">{{ \'view_specification.inputtedValue\' | translate }}
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr ng-repeat="item in ItemProperties" style="height:30px;">
                    <td style="vertical-align: middle;">
                    <span>{{item.GroupName}}</span>
                    </td>
                    <td style="vertical-align: middle;">
                    <span>{{item.PropertyName}}</span>
                    </td>
                    <td>
                    <div class="form-group col-lg-8 col-xs-12">
                        <input type="text" class="col-xs-12 vp-input vp-input-sm" name="property" ng-model="item.UserInput" />
                        <validtip for="property" class="vp-validtip"></validtip>
                    </div>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>'
    link: ($scope, element, attrs) ->
        $scope.$watch 'entity.SubcategoryCode', (newValue,oldValue)->
            $scope.getProperties(newValue) if newValue
            
        $scope.getProperties =(subcategory)->
            requestItem={
            action1:"website-subcategory-property",
            SubcategoryCode:subcategory
            }
            itemCreationAPI.search requestItem
            ,(response)->
                if(response)
                    $scope.ItemProperties = response.WebsiteSubcategoryProperties
])
