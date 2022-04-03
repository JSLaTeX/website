import type * as monaco from 'monaco-editor';
import { getProperty, setProperty } from 'dot-prop';

/**
	Fields that, if present in a LanguageConfiguration, must be a RegExp object rather than a string literal.
*/
const REGEXP_PROPERTIES = [
	// indentation
	'indentationRules.decreaseIndentPattern',
	'indentationRules.increaseIndentPattern',
	'indentationRules.indentNextLinePattern',
	'indentationRules.unIndentedLinePattern',

	// code folding
	'folding.markers.start',
	'folding.markers.end',

	// language's "word definition"
	'wordPattern',
];

/**
	Configuration data is read from JSON and JSONC files, which cannot contain regular expression literals. Although Monarch grammars will often accept either the source of a RegExp as a string OR a RegExp object, certain Monaco APIs accept only a RegExp object, so we must "rehydrate" those, as appropriate. It would probably save everyone a lot of trouble if we updated the APIs to accept a RegExp or a string literal. Possibly a small struct if flags need to be specified to the RegExp constructor.
 */
export function rehydrateRegexps(
	rawConfiguration: string
): monaco.languages.LanguageConfiguration {
	const out = JSON.parse(rawConfiguration) as Record<string, unknown>;
	for (const property of REGEXP_PROPERTIES) {
		// eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
		const value = getProperty(out, property) as unknown;
		if (typeof value === 'string') {
			setProperty(out, property, new RegExp(value));
		}
	}

	return out;
}
