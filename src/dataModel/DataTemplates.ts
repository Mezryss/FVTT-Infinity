/**
 * Abstract constructor suitable for use in data model template classes.
 */
export type TemplateConstructor = (abstract new (...args: any[]) => {}) & Pick<typeof foundry.abstract.DataModel, 'defineSchema'>;
