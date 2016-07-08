///<reference path="../typings/index.d.ts" />
var GnocchiDatasourceQueryCtrl = (function () {
    function GnocchiDatasourceQueryCtrl($scope, $injector) {
        var _this = this;
        this.$scope = $scope;
        this.$injector = $injector;
        this.$scope = $scope;
        this.panel = this.panelCtrl.panel;
        // TODO(sileht): Allows custom
        this.aggregators = ['mean', 'sum', 'min', 'max',
            'std', 'median', 'first', 'last', 'count'].concat(_.range(1, 100).map(function (i) { return i + "pct"; }));
        this.queryModes = [
            { text: 'Measurements of a metric of multiple resources', value: 'resource_search' },
            { text: 'Aggregated measurements of a metric across resources', value: 'resource_aggregation' },
            { text: 'Measurements of a metric of a resource', value: 'resource' },
            { text: 'Measurements of a metric', value: 'metric' }
        ];
        if (!this.target.refId) {
            this.target.refId = this.getNextQueryLetter();
        }
        // default
        if (!this.target.aggregator) {
            this.target.aggregator = 'mean';
        }
        if (!this.target.queryMode) {
            this.target.queryMode = "resource_search";
        }
        this.target.validQuery = false;
        this.target.queryError = 'No query';
        this.suggestResourceIDs = function (query, callback) {
            _this.datasource.performSuggestQuery(query, 'resources', _this.target).then(callback);
        };
        this.suggestMetricIDs = function (query, callback) {
            _this.datasource.performSuggestQuery(query, 'metrics', _this.target).then(callback);
        };
        this.suggestMetricNames = function (query, callback) {
            _this.datasource.performSuggestQuery(query, 'metric_names', _this.target).then(callback);
        };
        this.queryUpdated();
    }
    GnocchiDatasourceQueryCtrl.prototype.refresh = function () {
        this.panelCtrl.refresh();
    };
    GnocchiDatasourceQueryCtrl.prototype.queryUpdated = function () {
        this.target.queryError = this.datasource.validateTarget(this.target, false);
        this.target.validQuery = !this.target.queryError;
        this.refresh();
    };
    // QueryCTRL stuffs
    GnocchiDatasourceQueryCtrl.prototype.getNextQueryLetter = function () {
        var _this = this;
        var letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        return _.find(letters, function (refId) {
            return _.every(_this.panel.targets, function (other) {
                return other.refId !== refId;
            });
        });
    };
    GnocchiDatasourceQueryCtrl.templateUrl = 'partials/query.editor.html';
    return GnocchiDatasourceQueryCtrl;
})();
exports.GnocchiDatasourceQueryCtrl = GnocchiDatasourceQueryCtrl;
//# sourceMappingURL=query_ctrl.js.map