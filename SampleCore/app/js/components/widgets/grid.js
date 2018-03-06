"use strict";
exports.__esModule = true;
var mithril = require("mithril");
var m = mithril;
var compare_service_1 = require("../../services/compare-service");
function head(gridOptions, state) {
    var thead = m('thead', [
        m('tr', visibleColumns(gridOptions.columns)
            .map(function (column) { return columnHead(column, state); }))
    ]);
    return thead;
}
function body(gridOptions, state) {
    var data = sortByColumn(gridOptions, state);
    var columns = visibleColumns(gridOptions.columns);
    var tbody = m('tbody', [
        data.map(function (row) { return m('tr', columns.map(function (column) { return renderCell(row, column); })); })
    ]);
    return tbody;
}
function visibleColumns(columns) {
    return columns.filter(function (c) { return !c.hide; });
}
function columnHead(column, state) {
    return m('th.grid-column-title', {
        title: column.tooltip || '',
        onclick: function () { return titleClickActions(column, state); }
    }, [
        column.title,
        sortIndicator(column, state)
    ]);
}
function renderCell(row, column) {
    var value = columnValue(row, column);
    return m('td', {
        'class': column.cellClick ? 'grid-click-action' : undefined,
        title: column.cellTooltip ? column.cellTooltip(value) : undefined,
        onclick: function () { return column.cellClick ? column.cellClick(columnValue(row, column)) : undefined; }
    }, column.renderer ? column.renderer(value) : value);
}
function columnValue(row, column) {
    var value = row[column.id];
    return value === null || value === undefined ? column.contentIfNull : value;
}
function sortIndicator(column, state) {
    if (!column.allowSort)
        return '';
    var isSorted = column.id === state.sortedColumnId;
    var sortSymbol = isSorted && !state.sortDirection ? '▼' : '▲';
    var cssClass = "grid-column-sort-indicator" + (isSorted ? '' : '.grid-column-sort-indicator-hidden');
    var vn = m("span." + cssClass, sortSymbol);
    return vn;
}
function sortByColumn(gridOptions, state) {
    var data = gridOptions.data.slice();
    if (!state.sortedColumnId)
        return data;
    var columnId = state.sortedColumnId;
    var column = gridOptions.columns[columnId];
    var comparer = column && column.comparer
        ? column.comparer
        : compare_service_1.compareService.compareAny;
    data.sort(function (l, r) {
        var result = comparer(l[columnId], r[columnId]);
        return state.sortDirection ? result : -result;
    });
    return data;
}
function titleClickActions(column, state) {
    if (column.allowSort)
        columnSortAction(column, state);
}
function columnSortAction(column, state) {
    state.sortDirection = state.sortedColumnId === column.id
        ? !state.sortDirection
        : true;
    state.sortedColumnId = state.sortedColumnId === column.id && state.sortDirection
        ? null
        : column.id;
}
function view(vnode) {
    var gridOptions = vnode.attrs.gridOptions;
    if (!gridOptions)
        return null;
    var vdom = m('.grid', vnode.attrs, [
        m('table.pure-table.pure-table-bordered', [
            head(gridOptions, vnode.state),
            body(gridOptions, vnode.state)
        ])
    ]);
    return vdom;
}
// language=CSS
var css = "\n      .grid th, .grid td{white-space:nowrap;}\n      .grid-click-action{cursor:pointer;}\n      .grid-click-action:hover{text-decoration: underline;}\n      .grid-column-title:hover{cursor:pointer;}\n      .grid-column-sort-indicator{margin-left:1em;}\n      .grid-column-sort-indicator-hidden{visibility:collapse;}\n      .grid-column-title:hover .grid-column-sort-indicator-hidden{color:gray !important;visibility:visible;}";
exports.grid = {
    view: view,
    css: css
};
