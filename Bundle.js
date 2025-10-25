var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
function delay(ms) {
    return new Promise(function (resolve) { return setTimeout(resolve, ms); });
}
function removeBoldItalicNewline(line) {
    line = line.replace(/\[b\]/g, '').replace(/\[\/b\]/g, '');
    line = line.replace(/\[i\]/g, '').replace(/\[\/i\]/g, '');
    line = line.replace(/\[n\/\]/g, '');
    return line;
}
function getStatValue(variable) {
    try {
        //@ts-ignore
        if (variable in stats) {
            //@ts-ignore
            return stats[variable];
        }
        return undefined;
    }
    catch (error) {
        console.error(error);
        return undefined;
    }
}
function getStatDisplayLabel(label, value) {
    try {
        var regexMatcher = /\$\{(.+?)\}/;
        var match = regexMatcher.exec(label);
        var x = match ? match[1] : null;
        var matchRegex = new RegExp("\\$\\{\\s*(".concat(x, ")\\s*\\}"), 'g'); // match `${key}` syntax and capture the variable name
        var updatedStatLabel = label
            .replace(matchRegex, function (_, x) {
            if (value === undefined) {
                return ''; // replace with an empty string
            }
            else {
                return "".concat(value); // replace with the value from the stats object
            }
        })
            .trim();
        if (label !== updatedStatLabel) {
            return updatedStatLabel;
        }
        return undefined;
    }
    catch (error) {
        console.error(error);
        return undefined;
    }
}
function getStatLabels(originalLabel, variable) {
    var statValue = getStatValue(variable);
    if (statValue !== undefined) {
        var displayLabel = getStatDisplayLabel(originalLabel, statValue);
        return {
            original: originalLabel,
            display: displayLabel
        };
    }
    return undefined;
}
function getParsedStatData(parsedStat) {
    var statValue = getStatValue(parsedStat.variable);
    var statLabels = getStatLabels(parsedStat.label, parsedStat.variable);
    if (statLabels !== undefined) {
        try {
            var isOpposed = parsedStat.type === 'opposed_pair';
            if (typeof statValue !== 'boolean' &&
                ((Number.isNaN(statValue) === false &&
                    statValue != null &&
                    typeof statValue != 'undefined' &&
                    /[a-zA-Z]/.test(String(statValue)) === false &&
                    statValue != '') ||
                    Number.isInteger(statValue) === true)) {
                var transformedStatValue = typeof statValue === 'number' ? statValue : parseInt(statValue);
                if (isOpposed) {
                    var opposedStatLabels = getStatLabels(parsedStat.opposedLabel, parsedStat.variable);
                    var opposedKey = parsedStat.variable + '_opposed';
                    var statData = {
                        key: parsedStat.variable,
                        opposedKey: opposedKey,
                        value: transformedStatValue,
                        statType: 'number',
                        displayType: parsedStat.type,
                        label: statLabels,
                        opposedLabel: opposedStatLabels !== undefined
                            ? opposedStatLabels
                            : {
                                original: parsedStat.opposedLabel
                            }
                    };
                    //@ts-ignore
                    return statData;
                }
                else {
                    var statData = {
                        key: parsedStat.variable,
                        value: transformedStatValue,
                        statType: 'number',
                        displayType: parsedStat.type,
                        label: statLabels
                    };
                    //@ts-ignore
                    return statData;
                }
            }
            else {
                if (typeof statValue === 'string') {
                    var statData = {
                        key: parsedStat.variable,
                        value: statValue,
                        statType: 'string',
                        displayType: 'text',
                        label: statLabels
                    };
                    //@ts-ignore
                    return statData;
                }
            }
        }
        catch (error) {
            console.log(error);
            return undefined;
        }
    }
}
function getParseStats(rawStats) {
    var modifiableStatChartsStats = [];
    // Parse the stat chart
    var index = 0;
    for (var i = 0; i < rawStats.length; i++) {
        var parsedStat = undefined;
        var line = rawStats[i];
        var indent = line.search(/\S|$/);
        var pieces = line.trim().split(/\s+/);
        var type = pieces[0];
        var variable = pieces[1];
        var label = '';
        if (type == 'text') {
            if (pieces.length > 2) {
                label = pieces.slice(2).join(' ').trim();
                variable = variable.toLowerCase();
            }
            else {
                label = variable;
                variable = variable.toLowerCase();
            }
            parsedStat = { type: type, variable: variable, label: label };
        }
        else if (type == 'percent') {
            if (pieces.length > 2) {
                label = pieces.slice(2).join(' ').trim();
                variable = variable.toLowerCase();
            }
            else {
                label = variable;
                variable = variable.toLowerCase();
            }
            parsedStat = { type: type, variable: variable, label: label };
        }
        else if (type == 'opposed_pair') {
            var nextLine = rawStats[i + 1];
            var nextNextLine = rawStats[i + 2];
            var twoLabels = nextNextLine && nextNextLine.search(/\S|$/) > indent;
            var opposedLabel = '';
            if (twoLabels) {
                label = nextLine.trim();
                opposedLabel = nextNextLine.trim();
                variable = variable.toLowerCase();
                i += 2;
            }
            else {
                label = variable;
                opposedLabel = nextLine.trim();
                variable = variable.toLowerCase();
                i++;
            }
            parsedStat = { type: type, variable: variable, label: label, opposedLabel: opposedLabel };
        }
        else {
            console.log('Error: Invalid display type -> ' + line);
        }
        //@ts-ignore
        if (parsedStat !== undefined) {
            var parsedStatData = getParsedStatData(parsedStat);
            if (parsedStatData !== undefined) {
                modifiableStatChartsStats.push(parsedStatData);
            }
        }
        index++;
    }
    if (modifiableStatChartsStats.length === 0) {
        return undefined;
    }
    // modifiableStatChartsStats = Object.values(modifiableStatChartsStats).sort((a, b) => a.index - b.index);
    return modifiableStatChartsStats;
}
function getStatsFromFile(fileText) {
    var statChartsList = [];
    // Split the scene file content into lines
    var lines = fileText.split(/\r?\n/);
    var currentLine = 0;
    var statChartCount = 0;
    // Read the scene file line by line
    while (currentLine < lines.length) {
        var line = removeBoldItalicNewline(lines[currentLine]);
        var variable_line = (line.includes('${') || line.includes('$!{')) && line.includes('}');
        // Check if *stat_chart by chomping off whitespace from the beginning of the line
        if (line.trim().startsWith('*stat_chart')) {
            currentLine++;
            // if we found a *stat_chart then we can start parsing the stat chart
            var rawStatChart = [];
            // we need to keep track of the indentation level of the first line (the *stat_chart line)
            var firstIndent = line.search(/\S|$/);
            // then we move to the next line
            var isInStatChart = true;
            while (currentLine < lines.length && isInStatChart) {
                // update the line
                line = removeBoldItalicNewline(lines[currentLine]);
                // If the line is blank or a *comment, skip it
                var skippable = line.trim().length == 0;
                if (skippable) {
                    currentLine++;
                }
                else {
                    // get the current indentation level
                    var currentIndent = line.search(/\S|$/);
                    // If the next line is indented more than the first line, add it to the rawStatChart
                    if (currentIndent > firstIndent) {
                        if (!line.trim().startsWith('*') && !line.trim().startsWith('#')) {
                            rawStatChart.push(line);
                        }
                        currentLine++;
                    }
                    else {
                        isInStatChart = false;
                    }
                }
            }
            var parsedStats = getParseStats(rawStatChart);
            if (parsedStats !== undefined) {
                // statChartsList = statChartsList.concat(parsedStats);
                statChartsList.push(parsedStats);
                statChartCount++;
            }
        }
        else if (!line.trim().startsWith('*') && line.search(/\S|$/) == 0) {
            // TODO Commenting out due to lackluster labeling results
            // if (line.endsWith('}') && variable_line) {
            //   let type = 'text';
            //   // check the number of variables in the line
            //   let openBrackets = line.split('{').length - 1;
            //   let closeBrackets = line.split('}').length - 1;
            //   let numVariables = Math.min(openBrackets, closeBrackets);
            //   if (numVariables > 1) {
            //     let lines = [];
            //     // if there is more than one variable, the labels will just be the variable name with the first letter capitalized
            //     let variables = line.match(/\{\w+}/g); // examples: ${variable} $!{variable} -> {variable} {variable}
            //     if (variables == null) {
            //       console.log('Error: Invalid display type -> ' + line);
            //     } else {
            //       variables.forEach((variable) => {
            //         variable = variable.replace('{', '').replace('}', '');
            //         let label = variable.charAt(0).toUpperCase() + variable.slice(1);
            //         line = type + ' ' + variable + ' ' + label;
            //         lines.push(line);
            //       });
            //       const parsedStats = getParseStats(lines);
            //       if (parsedStats !== undefined) {
            //         statList = statList.concat(parsedStats);
            //       }
            //     }
            //   } else {
            //     let variable = line.substring(line.indexOf('{') + 1, line.indexOf('}')).toLowerCase();
            //     let label = line.substring(0, line.indexOf('$')).trim().replace(/\W+$/, '');
            //     line = type + ' ' + variable + ' ' + label;
            //     const parsedStats = getParseStats([line]);
            //     if (parsedStats !== undefined) {
            //       statList = statList.concat(parsedStats);
            //     }
            //   }
            // }
            currentLine++;
        }
        else {
            currentLine++;
        }
    }
    return statChartsList;
}
function lineExists(line) {
    if (line != '' && typeof line != 'undefined' && line != undefined) {
        return true;
    }
    else {
        return false;
    }
}
function lineAssignable(line) {
    if ((line.startsWith('*create') || line.startsWith('*set')) && line.split(' ').length > 2) {
        return true;
    }
    else {
        return false;
    }
}
function lineConditional(line) {
    if (line.startsWith('*if') ||
        line.startsWith('*elseif') ||
        line.startsWith('*elsif') ||
        line.startsWith('*selectable_if')) {
        return true;
    }
    else {
        return false;
    }
}
function addOption(line, optionType, optionRecord) {
    var lineElements = line.trim().split(' ');
    if (lineElements.length >= 3 && lineElements[2].startsWith('"')) {
        try {
            // Extract the name of the variable
            var variableOption = lineElements[1].toLowerCase();
            // Extract the value of the variable
            var value = optionType === 'string' ? line.split('"')[1] : Number(line.split('"')[1]);
            if (optionRecord[variableOption] !== undefined) {
                if (!optionRecord[variableOption].possibleValues.includes(value)) {
                    // Add the value to the optionRecord object
                    optionRecord[variableOption].possibleValues.push(value);
                }
            }
            else {
                optionRecord[variableOption] = {
                    possibleValues: [value],
                    inConditional: false
                };
            }
        }
        catch (err) {
            console.log("   Error at ".concat(line, " -> ").concat(err));
        }
    }
    return optionRecord;
}
function extractConditionalStatements(line, optionRecord) {
    var regexMatcher = /\((.+?)\)/g;
    var matches = line.match(regexMatcher);
    if (matches) {
        for (var i = 0; i < matches.length; i++) {
            var innerText = matches[i].substring(1, matches[i].length - 1); // Remove outer parentheses
            extractConditionalStatements(innerText, optionRecord); // Recursively process inner text
        }
    }
    else {
        // No more nested parentheses
        line = line.replace(/\(|\)/g, '');
        // Determine if = or != is used. If so, split the line on that character
        var splitChar = '';
        if (line.includes('!=')) {
            splitChar = '!=';
        }
        else if (line.includes('=')) {
            splitChar = '=';
        }
        if (splitChar != '') {
            var splitLine = line.split(splitChar);
            var variable = splitLine[0].trim().toLowerCase();
            if (optionRecord[variable]) {
                optionRecord[variable].inConditional = true;
            }
        }
    }
    return optionRecord;
}
var BASE_GAME_DATA = (function () { return __awaiter(_this, void 0, void 0, function () {
    var _a, BASE_URL, IS_COG_DEMOS, SCENE_LIST, SCENE_FILES, getFile, statCharts, updateStatCharts, STRING_VARIABLE_OPTIONS;
    var _this = this;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = (function () {
                    var currentURL = window.location.href;
                    var currentHostname = new URL(currentURL).hostname;
                    console.log({
                        URL: currentURL,
                        Host: currentHostname
                    });
                    return {
                        BASE_URL: currentURL.replace(/(index\.html$|mygame\/?$)/, ''),
                        IS_COG_DEMOS: currentHostname === 'cogdemos.ink' || 'moody.diy'
                    };
                })(), BASE_URL = _a.BASE_URL, IS_COG_DEMOS = _a.IS_COG_DEMOS;
                SCENE_LIST = stats.scene.nav._sceneList;
                SCENE_FILES = (function () {
                    console.log("Loading Scene Files...");
                    var sceneFilesList = SCENE_LIST.map(function (sceneName) {
                        return sceneName + '.txt';
                    });
                    console.log("*** Scene Files Loaded ***");
                    return sceneFilesList;
                })();
                getFile = function (sceneFile) { return __awaiter(_this, void 0, void 0, function () {
                    var fileURL, fetchedFile, error_1;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                fileURL = BASE_URL + 'mygame/scenes/' + sceneFile;
                                fetchedFile = undefined;
                                _a.label = 1;
                            case 1:
                                _a.trys.push([1, 6, , 7]);
                                if (!IS_COG_DEMOS) return [3 /*break*/, 3];
                                return [4 /*yield*/, fetch(fileURL, {
                                        method: 'GET',
                                        credentials: 'include',
                                        headers: {
                                            'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
                                        }
                                    })];
                            case 2:
                                fetchedFile = _a.sent();
                                return [3 /*break*/, 5];
                            case 3: return [4 /*yield*/, fetch(fileURL)];
                            case 4:
                                fetchedFile = _a.sent();
                                _a.label = 5;
                            case 5: return [3 /*break*/, 7];
                            case 6:
                                error_1 = _a.sent();
                                console.error(error_1);
                                return [3 /*break*/, 7];
                            case 7: return [2 /*return*/, fetchedFile];
                        }
                    });
                }); };
                return [4 /*yield*/, (function () { return __awaiter(_this, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    // Load the scene file content
                                    console.log("Loading choicescript_stats.txt...");
                                    return [4 /*yield*/, getFile('choicescript_stats.txt')
                                            .then(function (response) {
                                            if (!response.ok) {
                                                throw new Error('Network response was not ok');
                                            }
                                            return response.text();
                                        })
                                            .then(function (text) {
                                            var parsedStats = getStatsFromFile(text);
                                            console.log("*** choicescript_stats.txt Loaded ***");
                                            return parsedStats;
                                        })
                                            .catch(function (error) {
                                            console.error('Error:', error);
                                            return undefined;
                                        })];
                                case 1: return [2 /*return*/, _a.sent()];
                            }
                        });
                    }); })()];
            case 1:
                statCharts = _b.sent();
                updateStatCharts = function () {
                    var updatedStatCharts = [];
                    if (statCharts !== undefined) {
                        for (var index_i = 0; index_i < statCharts.length; index_i++) {
                            var updatedStatChart = [];
                            var modifiableStatChart = statCharts[index_i];
                            for (var index_j = 0; index_j < modifiableStatChart.length; index_j++) {
                                var modifiableStat = __assign({}, modifiableStatChart[index_j]);
                                var newModifiableStat = void 0;
                                var statValue = getStatValue(modifiableStat.key);
                                var statLabels = getStatLabels(modifiableStat.label.original, modifiableStat.key);
                                if (modifiableStat.displayType !== 'opposed_pair') {
                                    newModifiableStat = __assign(__assign({}, modifiableStat), { value: statValue, label: statLabels });
                                }
                                else {
                                    var opposedStatLabels = getStatLabels(modifiableStat.opposedLabel.original, modifiableStat.key);
                                    newModifiableStat = __assign(__assign({}, modifiableStat), { value: statValue, label: statLabels, opposedLabel: opposedStatLabels });
                                }
                                updatedStatChart.push(newModifiableStat);
                            }
                            updatedStatCharts.push(updatedStatChart);
                        }
                        statCharts = updatedStatCharts;
                    }
                };
                return [4 /*yield*/, (function () { return __awaiter(_this, void 0, void 0, function () {
                        var stringDataDict, promises, _loop_1, i;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    console.log("Loading String Options...");
                                    stringDataDict = {};
                                    promises = [];
                                    _loop_1 = function (i) {
                                        var sceneFile, promise;
                                        return __generator(this, function (_b) {
                                            switch (_b.label) {
                                                case 0:
                                                    sceneFile = SCENE_FILES[i];
                                                    // Load the scene file content
                                                    return [4 /*yield*/, delay(750)];
                                                case 1:
                                                    // Load the scene file content
                                                    _b.sent();
                                                    promise = getFile(sceneFile)
                                                        .then(function (response) {
                                                        if (!response.ok) {
                                                            throw new Error('Network response was not ok');
                                                        }
                                                        return response.text();
                                                    })
                                                        .then(function (text) {
                                                        console.log("   Loading ".concat(sceneFile, "..."));
                                                        // Split the scene file content into lines
                                                        var sceneLines = text.split('\n');
                                                        // Throw an error if the scene file has less than 3 lines
                                                        if (sceneLines.length < 3) {
                                                            throw new Error('Scene file has less than 3 lines');
                                                        }
                                                        // Iterate through each line of the scene file
                                                        for (var j = 0; j < sceneLines.length; j++) {
                                                            try {
                                                                var line = sceneLines[j].trim();
                                                                if (lineExists(line)) {
                                                                    // Check if the line starts with *create or *temp or *set
                                                                    if (lineAssignable(line)) {
                                                                        addOption(line, 'string', stringDataDict);
                                                                    }
                                                                    else if (lineConditional(line)) {
                                                                        line = line.replace(/\*if|\*elseif|\*elsif|\*selectable_if/g, '');
                                                                        extractConditionalStatements(line, stringDataDict);
                                                                    }
                                                                }
                                                            }
                                                            catch (err) {
                                                                console.error("   Error at ".concat(sceneFile, " -> ").concat(err));
                                                            }
                                                        }
                                                    })
                                                        .then(function () {
                                                        console.log("   *** ".concat(sceneFile, " Loaded ***"));
                                                    })
                                                        .catch(function (error) {
                                                        console.error("   Error: ".concat(error, " when loading ").concat(sceneFile));
                                                    });
                                                    promises.push(promise);
                                                    return [2 /*return*/];
                                            }
                                        });
                                    };
                                    i = 0;
                                    _a.label = 1;
                                case 1:
                                    if (!(i < SCENE_FILES.length)) return [3 /*break*/, 4];
                                    return [5 /*yield**/, _loop_1(i)];
                                case 2:
                                    _a.sent();
                                    _a.label = 3;
                                case 3:
                                    i++;
                                    return [3 /*break*/, 1];
                                case 4: return [2 /*return*/, Promise.all(promises)
                                        .then(function () {
                                        console.log("*** String Options Loaded ***");
                                        return stringDataDict;
                                    })
                                        .catch(function (error) {
                                        console.error("Error: ".concat(error));
                                        return undefined;
                                    })];
                            }
                        });
                    }); })()];
            case 2:
                STRING_VARIABLE_OPTIONS = _b.sent();
                if (statCharts === undefined || STRING_VARIABLE_OPTIONS === undefined) {
                    return [2 /*return*/, undefined];
                }
                else {
                    return [2 /*return*/, {
                            SCENE_FILES: SCENE_FILES,
                            get statCharts() {
                                return statCharts;
                            },
                            updateStatCharts: updateStatCharts,
                            STRING_VARIABLE_OPTIONS: STRING_VARIABLE_OPTIONS
                        }];
                }
                return [2 /*return*/];
        }
    });
}); })();
var CHEAT_TAB_LOOKUP = {
    statCharts: {
        btnID: 'statChartsTabBtn',
        contentID: 'statChartsTab',
        index: 0
    },
    numericalStats: {
        btnID: 'numericalStatsTabBtn',
        contentID: 'numericalStatsTab',
        index: 1
    },
    booleanStats: {
        btnID: 'booleanStatsTabBtn',
        contentID: 'booleanStatsTab',
        index: 2
    },
    stringStats: {
        btnID: 'stringStatsTabBtn',
        contentID: 'stringStatsTab',
        index: 3
    }
};
var BASE_HTML_STYLE = "\n  <style>\n    html {\n      font: -apple-system-body;\n    }\n    body {\n      position: relative;\n      max-width: 80ch;\n      min-height: 100vh;\n      font-size: 100%;\n      font-family: Palatino,Georgia,times new roman,serif;\n      background-color: #f7f4f1;color: rgba(0,0,0,.85);\n      margin: 1ch auto;\n      padding: 0;\n      -webkit-user-select: text;\n      transition-property: background-color,color;\n      transition-duration: 2s;\n      -webkit-transition-property: background-color,color;\n      -webkit-transition-duration: 2s;\n    }\n    table {\n      font-family: Arial, Helvetica, sans-serif;\n      border-collapse: collapse;\n      width: 100%;\n    }\n    th {\n      padding-top: 6px;\n      padding-bottom: 6px;\n      text-align: left;\n    }\n    td {\n      padding: 3px;\n    }\n    a {\n      color: blue;\n      text-decoration: underline;\n      cursor: pointer;\n    }\n    button.tabButton {\n      appearance: none;\n      border-width: 1px;\n    }\n    button.tabButton:hover {\n      background-color: #d9d9d9;\n    }\n    #main {\n      line-height: 1.5;\n    }\n    .tabContentItem {\n      display: none;\n    }\n    .container {\n      position: absolute;\n      left: 0;\n      right: 0;\n      margin: 0 1ch;\n      animation-duration: .5s;\n      -webkit-animation-duration: .5s;\n      transition-property: opacity;\n      transition-duration: .5s;\n      transition-timing-function: ease-in;\n      -webkit-transition-property: opacity;\n      -webkit-transition-duration: .5s;\n      -webkit-transition-timing-function: ease-in;\n    }\n    .statBar {\n      background-color: #949291;\n      height: 2.5rem;\n      line-height: 2.5rem;\n      margin: .5ch 0;\n      width: 30rem;\n      max-width: 100%;\n      color: #f7f4f1;\n      position: relative;\n      z-index: 0;\n    }\n    .opposed {\n      background-color: #6d6dfc;\n    }\n    .statText {\n      margin-left: 2ex;\n      text-indent: -1ex;\n    }\n    .statBar > span,\n    .statLine > span {\n      position: relative;\n      z-index: 1;\n      white-space: nowrap;\n    }\n    .statValue {\n      background-color: #ff5955;\n      position: absolute;\n      top: 0;\n      left: 0;\n      height: 100%;\n      z-index: -1;\n    }\n    .searchInput {\n      margin-bottom: 5px;\n    }\n    input[type=radio],\n    input[type=checkbox] {\n      margin-right: 1ch;\n    }\n    h1 {\n      font-size: 1.5em;\n      font-weight: 400;\n    }\n    h2 {\n      font-size: 1.125em;\n      font-weight: 400;\n    }\n    #footer {\n      margin: 10px 0 75px;\n    }\n    .spacedLink {\n      margin-right: .5em;\n    }\n    .spacedLink:last-child {\n      margin-right: 0;\n    }\n    .alignleft {\n      display: inline;\n      float: left;\n      margin-right: 1.625em;\n      margin-bottom: 1.5em;\n    }\n    .alignright {\n      display: inline;\n      float: right;\n      margin-left: 1.625em;\n      margin-bottom: 1.5em;\n    }\n    .aligncenter {\n      clear: both;\n      display: block;\n      margin-left: auto;\n      margin-right: auto;\n      margin-bottom: 1.5em;\n    }\n    #main form {\n      clear: both;\n    }\n    @media only screen and (max-width: 480px) {\n      .definition {\n        display:none;\n      }\n      .gameTitle {\n        display: none;\n      }\n      #header {\n        margin-top: 30px;\n      }\n      #text .alignleft,\n      #text .alignright {\n        max-width: 45%;\n      }\n    }\n    .editable {\n      display: inline-block;\n      min-width: 50px;\n      padding: 1px 10px;\n      border: 1px solid #ccc;\n      border-radius: 3px;\n      outline: none;\n      background-color: ghostwhite;\n    }\n    .editable:active {\n      border: 1px solid #ccc;\n      border-radius: 3px;\n      outline: none;\n    }\n    .editable:hover {\n      border: 1px solid #ccc;\n      border-radius: 3px;\n      outline: none;\n    }\n    .inputContainer {\n      display: block;\n    }\n    .error {\n      color: red;\n      font-size: smaller;\n      margin-bottom: 0.2em;\n    }\n    .tabContentItem.tabContent {\n      text-align: center;\n      margin-bottom: 10;\n    }\n    .tabContentItem.tabContent h2 {\n      margin-bottom: .1em;\n    }\n  </style>\n";
function generateStatChartsHtml(modifiableStatChartsStats) {
    var _a, _b;
    var statChartsHtml = (function () {
        var htmlBuilder = '';
        htmlBuilder += "<div class='tabContentItem' id='statChartsTab'>";
        htmlBuilder += "<div class='tabContent'><h2>STAT CHARTS</h2>";
        return htmlBuilder;
    })();
    if (modifiableStatChartsStats.length <= 0) {
        statChartsHtml +=
            '<div style="text-align: center;margin-bottom: 10;"><h1 style="margin-bottom: .1em;">There are no stat charts to modify.</h1></div></div></div>';
        return statChartsHtml;
    }
    for (var index_i = 0; index_i < modifiableStatChartsStats.length; index_i++) {
        var modifiableStatChart = modifiableStatChartsStats[index_i];
        for (var index_j = 0; index_j < modifiableStatChart.length; index_j++) {
            var modifiableStat = modifiableStatChart[index_j];
            var key = modifiableStat.key;
            var value = modifiableStat.value;
            var label = ((_a = modifiableStat.label) === null || _a === void 0 ? void 0 : _a.display) !== undefined ? modifiableStat.label.display : modifiableStat.label.original;
            var title = "title=\"Stat: ".concat(key, "\"");
            var keyType = 'chart';
            if (modifiableStat.displayType == 'opposed_pair') {
                var opposedKey = modifiableStat.opposedKey;
                var opposedLabel = ((_b = modifiableStat.opposedLabel) === null || _b === void 0 ? void 0 : _b.display) !== undefined
                    ? modifiableStat.opposedLabel.display
                    : modifiableStat.opposedLabel.original;
                statChartsHtml += "<div class=\"statBar statLine opposed\" ".concat(title, ">");
                statChartsHtml += "<span style=\"user-select: none;pointer-events: none;display: inline-block;width: 1%;height: 1%;float: left;\">&nbsp;&nbsp;".concat(label, ": <span id=\"").concat(key, "-").concat(keyType, "\"></span>% </span>");
                statChartsHtml += "<span style=\"float: right; user-select: none; pointer-events: none; display: inline-block; height: 1%;\">".concat(opposedLabel, ": <span id=\"").concat(opposedKey, "-").concat(keyType, "\"></span>%&nbsp;&nbsp;</span>");
                statChartsHtml += "<div class=\"statValue\" id=\"statBar".concat(label, "\" style=\"width: ").concat(value, "%;\" onmousedown=\"handleDrag(event, '").concat(key, "', '").concat(opposedKey, "')\">&nbsp;</div>");
                statChartsHtml += '</div>';
            }
            if (modifiableStat.displayType == 'percent') {
                statChartsHtml += "<div class=\"statBar statLine\" ".concat(title, ">");
                statChartsHtml += "<span style=\"user-select: none;pointer-events: none;display: inline-block;width: 1%;height: 1%;float: left;\">&nbsp;&nbsp;".concat(label, ": <span id=\"").concat(key, "-").concat(keyType, "\"></span>%</span>");
                statChartsHtml += "<div class=\"statValue\" id=\"statBar".concat(label, "\" style=\"width: ").concat(value, "%;\" onmousedown=\"handleDrag(event, '").concat(key, "')\">&nbsp;</div>");
                statChartsHtml += '</div>';
            }
            if (modifiableStat.displayType == 'text') {
                var statType = modifiableStat.statType;
                statChartsHtml += "<div class=\"statText\" style=\"text-align: left;\" ".concat(title, ">");
                statChartsHtml += '<div class="inputContainer">';
                statChartsHtml += "<span>".concat(label, ": </span>");
                statChartsHtml += "<span id=\"".concat(key, "-").concat(keyType, "\" contenteditable=\"true\" data-type=\"").concat(statType, "\" class=\"editable\" oninput=\"updateStat('").concat(key, "', '").concat(keyType, "')\"></span>");
                statChartsHtml += '</div>';
                statChartsHtml += "<span id=\"".concat(key, "-").concat(keyType, "Error\" class=\"error\"></span>");
                statChartsHtml += '</div>';
            }
        }
        if (index_i < modifiableStatChartsStats.length - 1) {
            statChartsHtml += '<br>';
        }
    }
    statChartsHtml += '</div></div>';
    return statChartsHtml;
}
function generateNumericalHtml(modifiableNumericalStats) {
    var numericalHtml = (function () {
        var htmlBuilder = '';
        htmlBuilder += "<div class='tabContentItem' id='numericalStatsTab'>";
        htmlBuilder +=
            '<div style="text-align: center;margin-bottom: 10;"><h2 style="margin-bottom: .1em;">NUMERICAL STATS</h2>';
        return htmlBuilder;
    })();
    if (modifiableNumericalStats.length <= 0) {
        numericalHtml +=
            '<div style="text-align: center;margin-bottom: 10;"><h1 style="margin-bottom: .1em;">There are no numerical stats to modify.</h1></div></div></div>';
        return Promise.resolve(numericalHtml);
    }
    numericalHtml += "<input type=\"text\" id=\"searchNumerical\" class=\"searchInput\" oninput=\"filterTable('searchNumerical', 'numericalTable')\" placeholder=\"Search...\">";
    numericalHtml += '<table id="numericalTable" class="statTable">';
    numericalHtml += '<tr><th>Stat</th>';
    numericalHtml += '<th>Value</th></tr>';
    var keyType = 'numerical';
    for (var index = 0; index < modifiableNumericalStats.length; index++) {
        var key = modifiableNumericalStats[index].key;
        var displayType = modifiableNumericalStats[index].displayType;
        numericalHtml += '<tr>';
        numericalHtml += "<td>".concat(key, "</td>");
        numericalHtml += '<td>';
        numericalHtml += '<div class="statText" style="text-align: left;">';
        numericalHtml += '<div class="inputContainer">';
        numericalHtml += "<span id=\"".concat(key, "-").concat(keyType, "\" contenteditable=\"true\" data-type=\"").concat(displayType, "\" class=\"editable\" oninput=\"updateStat('").concat(key, "', '").concat(keyType, "')\"></span>");
        numericalHtml += '</div>';
        numericalHtml += "<span id=\"".concat(key, "-").concat(keyType, "Error\" class=\"error\"></span>");
        numericalHtml += '</div>';
        numericalHtml += '</td></tr>';
    }
    numericalHtml += '</table></div></div>';
    return numericalHtml;
}
function generateBooleanHtml(modifiableBooleanStats) {
    var booleanHtml = (function () {
        var htmlBuilder = '';
        htmlBuilder += "<div class='tabContentItem' id='booleanStatsTab'>";
        htmlBuilder +=
            '<div style="text-align: center;margin-bottom: 10;"><h2 style="margin-bottom: .1em;">BOOLEAN STATS</h2>';
        return htmlBuilder;
    })();
    if (modifiableBooleanStats.length <= 0) {
        booleanHtml +=
            '<div style="text-align: center;margin-bottom: 10;"><h1 style="margin-bottom: .1em;">There are no boolean stats to modify.</h1></div></div></div>';
        return Promise.resolve(booleanHtml);
    }
    booleanHtml += "<input type=\"text\" id=\"searchBoolean\" class=\"searchInput\" oninput=\"filterTable('searchBoolean', 'booleanTable')\" placeholder=\"Search...\">";
    booleanHtml += '<table id="booleanTable" class="statTable">';
    booleanHtml += '<tr><th>Stat</th>';
    booleanHtml += '<th>Value</th></tr>';
    var keyType = 'boolean';
    for (var index = 0; index < modifiableBooleanStats.length; index++) {
        var key = modifiableBooleanStats[index].key;
        var value = modifiableBooleanStats[index].value;
        booleanHtml += '<tr>';
        booleanHtml += "<td>".concat(key, "</td>");
        booleanHtml += "<td><input type=\"checkbox\" id=\"".concat(key, "-").concat(keyType, "\" name=\"").concat(key, "\" value=\"").concat(value, "\" onchange=\"modifyBoolean('").concat(key, "')\"/><span id=\"bool-").concat(key, "\">True</span></td>");
        booleanHtml += '</tr>';
    }
    booleanHtml += '</table></div></div>';
    return booleanHtml;
}
function generateStringHtml(modifiableStringStats) {
    return __awaiter(this, void 0, void 0, function () {
        var awaitedData, selectType, customType, conditional, stringHtml, index, key, value, stringCondition, currentValue, i;
        var _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0: return [4 /*yield*/, BASE_GAME_DATA];
                case 1:
                    awaitedData = _c.sent();
                    selectType = 'select';
                    customType = 'custom';
                    conditional = false;
                    stringHtml = (function () {
                        var htmlBuilder = '';
                        htmlBuilder += "<div class='tabContentItem' id='stringStatsTab'>";
                        htmlBuilder +=
                            '<div style="text-align: center;margin-bottom: 10;"><h2 style="margin-bottom: .1em;">STRING STATS</h2>';
                        return htmlBuilder;
                    })();
                    if (modifiableStringStats.length <= 0) {
                        stringHtml +=
                            '<div style="text-align: center;margin-bottom: 10;"><h1 style="margin-bottom: .1em;">There are no string stats to modify.</h1></div></div></div>';
                        return [2 /*return*/, Promise.resolve(stringHtml)];
                    }
                    stringHtml += "<input type=\"text\" id=\"searchString\" class=\"searchInput\" oninput=\"filterTable('searchString', 'stringTable')\" placeholder=\"Search...\">";
                    stringHtml += '<table id="stringTable" class="statTable">';
                    stringHtml += '<tr><th>Stat</th>';
                    stringHtml += '<th>Game Values</th>';
                    stringHtml += '<th>Input Value</th></tr>';
                    for (index = 0; index < modifiableStringStats.length; index++) {
                        key = modifiableStringStats[index].key;
                        value = modifiableStringStats[index].value;
                        stringCondition = (_a = awaitedData.STRING_VARIABLE_OPTIONS[key]) === null || _a === void 0 ? void 0 : _a.inConditional;
                        if (stringCondition != undefined) {
                            conditional = true;
                        }
                        else {
                            conditional = false;
                        }
                        stringHtml += '<tr>';
                        if (conditional) {
                            stringHtml += "<td class=\"conditional\" title=\"Stat is in conditional\"><u>".concat(key, "</u></td>");
                        }
                        else {
                            stringHtml += "<td>".concat(key, "</td>");
                        }
                        stringHtml += "<td><select name=\"".concat(key, "\" id=\"").concat(key, "-select\" onchange=\"modifyString('").concat(key, "', '").concat(selectType, "')\">");
                        currentValue = value;
                        stringHtml += "<option value=\"".concat(value, "\">").concat(value, "</option>");
                        for (i = 0; i < ((_b = awaitedData.STRING_VARIABLE_OPTIONS[key]) === null || _b === void 0 ? void 0 : _b.possibleValues.length); i++) {
                            value = awaitedData.STRING_VARIABLE_OPTIONS[key].possibleValues[i];
                            if (value != currentValue) {
                                stringHtml += "<option value=\"".concat(value, "\">").concat(value, "</option>");
                            }
                        }
                        stringHtml += '</select></td>';
                        stringHtml += "<td><input type=\"text\" id=\"".concat(key, "-input\" value=\"").concat(value, "\" oninput=\"modifyString('").concat(key, "', '").concat(customType, "')\"></td>");
                        stringHtml += '</tr>';
                    }
                    stringHtml += '</table></div></div>';
                    return [2 /*return*/, stringHtml];
            }
        });
    });
}
function generateHtml(modifiableStatChartsStats, modifiableNumericalStats, modifiableBooleanStats, modifiableStringStats) {
    return __awaiter(this, void 0, void 0, function () {
        var cheatPageHtml, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    cheatPageHtml = BASE_HTML_STYLE;
                    cheatPageHtml += "<div class='container' id='container'>";
                    cheatPageHtml += "<div id='main' style='text-align: center;'>";
                    cheatPageHtml += "<div id='text' style='display: inline-block;'>";
                    cheatPageHtml +=
                        '<div style="text-align: center;margin-bottom: 10;"><h1 style="margin-bottom: .1em;">Modify Stats</h1>';
                    cheatPageHtml += "<div id='tabButtons'>";
                    cheatPageHtml += "<button class='tabButton' id='".concat(CHEAT_TAB_LOOKUP.statCharts.btnID, "' onclick='showTab(").concat(CHEAT_TAB_LOOKUP.statCharts.index, ")'>Stat Charts</button>");
                    cheatPageHtml += "<button class='tabButton' id='".concat(CHEAT_TAB_LOOKUP.numericalStats.btnID, "' onclick='showTab(").concat(CHEAT_TAB_LOOKUP.numericalStats.index, ")'>Numerical Stats</button>");
                    cheatPageHtml += "<button class='tabButton' id='".concat(CHEAT_TAB_LOOKUP.booleanStats.btnID, "' onclick='showTab(").concat(CHEAT_TAB_LOOKUP.booleanStats.index, ")'>Boolean Stats</button>");
                    cheatPageHtml += "<button class='tabButton' id='".concat(CHEAT_TAB_LOOKUP.stringStats.btnID, "' onclick='showTab(").concat(CHEAT_TAB_LOOKUP.stringStats.index, ")'>String Stats</button>");
                    cheatPageHtml += '</div>';
                    cheatPageHtml += "<div id='tabContent'>";
                    cheatPageHtml += generateStatChartsHtml(modifiableStatChartsStats);
                    cheatPageHtml += generateNumericalHtml(modifiableNumericalStats);
                    cheatPageHtml += generateBooleanHtml(modifiableBooleanStats);
                    _a = cheatPageHtml;
                    return [4 /*yield*/, generateStringHtml(modifiableStringStats)];
                case 1:
                    cheatPageHtml = _a + _b.sent();
                    cheatPageHtml += '</div></div></div></div>';
                    return [2 /*return*/, cheatPageHtml];
            }
        });
    });
}
var childWindow = undefined;
var gameButtons = document.getElementById('buttons');
var shouldLoadCheatButton = function () {
    var cheatButtonElement = document.getElementById('cheatButton');
    return cheatButtonElement === null;
};
if (!shouldLoadCheatButton()) {
    // Cheats have been loaded already
    // @ts-ignore
    clearInterval(myInterval);
}
// Create a Proxy object to listen for changes to the stats object
// @ts-ignore
var statsProxy = new Proxy(stats, {
    set: function (target, property, value) {
        target[property] = value;
        updateStats();
        return true;
    }
});
// Replace the original stats object with the Proxy object
// @ts-ignore
stats = statsProxy;
// Function to update the modifiableStatChartsStats and statModifiers arrays
function updateStats() {
    return __awaiter(this, void 0, void 0, function () {
        var awaitedData, _a, modifiableBooleanStats, modifiableNumericalStats, modifiableStringStats;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, BASE_GAME_DATA];
                case 1:
                    awaitedData = _b.sent();
                    if (!(awaitedData !== undefined)) return [3 /*break*/, 3];
                    awaitedData.updateStatCharts();
                    return [4 /*yield*/, compileAllStats()];
                case 2:
                    _a = _b.sent(), modifiableBooleanStats = _a.modifiableBooleanStats, modifiableNumericalStats = _a.modifiableNumericalStats, modifiableStringStats = _a.modifiableStringStats;
                    return [2 /*return*/, {
                            get modifiableStatChartsStats() {
                                return awaitedData.statCharts;
                            },
                            modifiableBooleanStats: modifiableBooleanStats,
                            modifiableNumericalStats: modifiableNumericalStats,
                            modifiableStringStats: modifiableStringStats
                        }];
                case 3: return [2 /*return*/, undefined];
            }
        });
    });
}
function compileAllStats() {
    return __awaiter(this, void 0, void 0, function () {
        var modifiableBooleanStats, modifiableNumericalStats, modifiableStringStats, awaitedData, _i, _a, _b, key, value, val, val, val, error_2;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    modifiableBooleanStats = [];
                    modifiableNumericalStats = [];
                    modifiableStringStats = [];
                    _c.label = 1;
                case 1:
                    _c.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, BASE_GAME_DATA];
                case 2:
                    awaitedData = _c.sent();
                    // @ts-ignore
                    for (_i = 0, _a = Object.entries(stats); _i < _a.length; _i++) {
                        _b = _a[_i], key = _b[0], value = _b[1];
                        try {
                            if (typeof value === 'boolean') {
                                val = value;
                                modifiableBooleanStats.push({ key: key, value: val, displayType: 'boolean' });
                            }
                            else if ((Number.isNaN(value) === false &&
                                value !== null &&
                                value !== undefined &&
                                /[a-zA-Z]/.test(String(value)) === false &&
                                value !== '') ||
                                Number.isInteger(value) === true) {
                                val = typeof value === 'number' ? value : parseInt(value);
                                // variable is a number
                                modifiableNumericalStats.push({ key: key, value: val, displayType: 'number' });
                            }
                            else {
                                val = value;
                                if (typeof val === 'string') {
                                    // variable is a string
                                    if (awaitedData.STRING_VARIABLE_OPTIONS[key] !== undefined &&
                                        awaitedData.STRING_VARIABLE_OPTIONS[key].possibleValues.length > 1) {
                                        modifiableStringStats.push({ key: key, value: val, displayType: 'string' });
                                    }
                                }
                            }
                        }
                        catch (err) {
                            console.error("Error (".concat(err, ") -> ").concat(key, ": ").concat(value));
                        }
                    }
                    return [3 /*break*/, 4];
                case 3:
                    error_2 = _c.sent();
                    console.error(error_2);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/, {
                        modifiableBooleanStats: modifiableBooleanStats,
                        modifiableNumericalStats: modifiableNumericalStats,
                        modifiableStringStats: modifiableStringStats
                    }];
            }
        });
    });
}
var selectedCheatTab = {
    index: undefined,
    setIndex: function (newValue) {
        if (newValue !== this.index) {
            this.index = newValue;
            this.onchange();
        }
    },
    onchange: function () {
        // console.log('Changed Index: ', this.index);
    }
};
// Shim for mobile inline mode (so popup.js doesn't crash)
if (typeof window.childWindow === 'undefined') {
    window.childWindow = {
        document: document,
        location: window.location,
        console: window.console
    };
    console.log('📱 childWindow shim created for inline mode.');
}

function openCheatWindow(cheatWindowHTML) {
    console.log('📱 Inline cheat window (mobile patch active)');

    // clear current page and replace with cheat interface
    document.body.innerHTML = '';

    // title header
    const header = document.createElement('h2');
    header.textContent = 'ChoiceScript Editor (Inline Mode)';
    header.style.textAlign = 'center';
    header.style.fontFamily = 'sans-serif';
    header.style.margin = '20px 0';
    document.body.appendChild(header);

    // insert the HTML that normally went into the popup
    const wrapperDiv = document.createElement('div');
    wrapperDiv.innerHTML = cheatWindowHTML;
    document.body.appendChild(wrapperDiv);

    // attach the popup.js script manually so features still work
    const scriptTag = document.createElement('script');
    scriptTag.src = 'https://choicescript.blob.core.windows.net/scripts/popup.js';
    scriptTag.onload = () => console.log('✅ popup.js loaded (inline mode)');
    document.body.appendChild(scriptTag);

    // optional "Return to Game" link
    const returnBtn = document.createElement('button');
    returnBtn.textContent = 'Return to Game';
    returnBtn.style.display = 'block';
    returnBtn.style.margin = '30px auto';
    returnBtn.style.padding = '10px 20px';
    returnBtn.style.fontSize = '16px';
    returnBtn.style.borderRadius = '8px';
    returnBtn.style.border = 'none';
    returnBtn.style.background = '#4b7bec';
    returnBtn.style.color = 'white';
    returnBtn.onclick = () => location.reload();
    document.body.appendChild(returnBtn);
}
function updateCheatStats() {
    return __awaiter(this, void 0, void 0, function () {
        var statDatas, modifiableStatChartsStats, modifiableBooleanStats, modifiableNumericalStats, modifiableStringStats, index_i, modifiableStatChart, index_j, modifiableStat, key, value, opposedKey, label, statLabel, key, value, label, statLabel, key, value, index, key, value, index, _a, key, value, index, key, value, selectElement, val, options, i, option;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    if (!(childWindow && !childWindow.closed)) return [3 /*break*/, 2];
                    return [4 /*yield*/, updateStats()];
                case 1:
                    statDatas = _b.sent();
                    if (statDatas !== undefined) {
                        try {
                            modifiableStatChartsStats = statDatas.modifiableStatChartsStats, modifiableBooleanStats = statDatas.modifiableBooleanStats, modifiableNumericalStats = statDatas.modifiableNumericalStats, modifiableStringStats = statDatas.modifiableStringStats;
                            for (index_i = 0; index_i < modifiableStatChartsStats.length; index_i++) {
                                modifiableStatChart = modifiableStatChartsStats[index_i];
                                for (index_j = 0; index_j < modifiableStatChart.length; index_j++) {
                                    modifiableStat = modifiableStatChart[index_j];
                                    try {
                                        if (modifiableStat.displayType === 'opposed_pair') {
                                            key = modifiableStat.key, value = modifiableStat.value, opposedKey = modifiableStat.opposedKey, label = modifiableStat.label;
                                            statLabel = (label === null || label === void 0 ? void 0 : label.display) !== undefined ? label.display : label.original;
                                            childWindow.document.getElementById("".concat(key, "-chart")).textContent = "".concat(value);
                                            childWindow.document.getElementById("statBar".concat(statLabel)).style.width = "".concat(value, "%");
                                            childWindow.document.getElementById("".concat(opposedKey, "-chart")).textContent = "".concat(100 - value);
                                        }
                                        if (modifiableStat.displayType === 'percent') {
                                            key = modifiableStat.key, value = modifiableStat.value, label = modifiableStat.label;
                                            statLabel = (label === null || label === void 0 ? void 0 : label.display) !== undefined ? label.display : label.original;
                                            childWindow.document.getElementById("".concat(key, "-chart")).textContent = "".concat(value);
                                            childWindow.document.getElementById("statBar".concat(statLabel)).style.width = "".concat(value, "%");
                                        }
                                        if (modifiableStat.displayType === 'text') {
                                            key = modifiableStat.key, value = modifiableStat.value;
                                            childWindow.document.getElementById("".concat(key, "-chart")).textContent = "".concat(value);
                                        }
                                    }
                                    catch (error) {
                                        if (error instanceof ReferenceError) {
                                            // Error: childWindow is not defined
                                        }
                                        else {
                                            console.error("Error with StatChartsStats: ".concat(modifiableStatChartsStats, " -> ").concat(error));
                                        }
                                    }
                                }
                            }
                            for (index = 0; index < modifiableBooleanStats.length; index++) {
                                key = modifiableBooleanStats[index].key;
                                value = modifiableBooleanStats[index].value;
                                try {
                                    //@ts-ignore
                                    childWindow.document.getElementById("".concat(key, "-boolean")).value = value; //@ts-ignore
                                    childWindow.document.getElementById("".concat(key, "-boolean")).checked = value;
                                }
                                catch (error) {
                                    if (error instanceof ReferenceError) {
                                        // Error: childWindow is not defined
                                    }
                                    else {
                                        console.error("Error with BooleanStats: ".concat(modifiableBooleanStats, " -> ").concat(error));
                                    }
                                }
                            }
                            for (index = 0; index < modifiableNumericalStats.length; index++) {
                                _a = modifiableNumericalStats[index], key = _a.key, value = _a.value;
                                try {
                                    childWindow.document.getElementById("".concat(key, "-numerical")).textContent = "".concat(value);
                                }
                                catch (error) {
                                    if (error instanceof ReferenceError) {
                                        // Error: childWindow is not defined
                                    }
                                    else {
                                        console.error("Error with NumericalStats: ".concat(modifiableNumericalStats, " -> ").concat(error));
                                    }
                                }
                            }
                            for (index = 0; index < modifiableStringStats.length; index++) {
                                key = modifiableStringStats[index].key;
                                value = modifiableStringStats[index].value;
                                try {
                                    // two string inputs to update: key-input and key-select
                                    //@ts-ignore
                                    childWindow.document.getElementById(key + '-input').value = value;
                                    childWindow.document.getElementById(key + '-input').textContent = value; //@ts-ignore
                                    childWindow.document.getElementById(key + '-select').value = value;
                                    selectElement = childWindow.document.getElementById(key + '-select');
                                    val = selectElement.value;
                                    options = selectElement.options;
                                    try {
                                        if (typeof options != 'undefined') {
                                            for (i = 0; i < options.length; i++) {
                                                option = options[i];
                                                if (option.value != val) {
                                                    option.removeAttribute('selected');
                                                }
                                                else {
                                                    option.setAttribute('selected', '');
                                                }
                                            }
                                        }
                                    }
                                    catch (error) {
                                        console.error("Error with StringOptions: ".concat(options, " -> ").concat(error));
                                    }
                                }
                                catch (error) {
                                    if (error instanceof ReferenceError) {
                                        // Error: childWindow is not defined
                                    }
                                    else {
                                        console.error("Error with StringStats: ".concat(modifiableStringStats, " -> ").concat(error));
                                    }
                                }
                            }
                        }
                        catch (error) {
                            console.error(error);
                        }
                    }
                    _b.label = 2;
                case 2: return [2 /*return*/];
            }
        });
    });
}
initCheats();
// every 2.5 seconds, update the existing table with the values found in the game stats.
// Sometimes the game will reset the stats, so this ensures the player always sees the latest values
var myInterval = setInterval(function () {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, updateCheatStats()];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}, 3000);
