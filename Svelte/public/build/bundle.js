
(function(l, r) { if (l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (window.location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.getElementsByTagName('head')[0].appendChild(r) })(window.document);
var app = (function () {
    'use strict';

    function noop() { }
    function add_location(element, file, line, column, char) {
        element.__svelte_meta = {
            loc: { file, line, column, char }
        };
    }
    function run(fn) {
        return fn();
    }
    function blank_object() {
        return Object.create(null);
    }
    function run_all(fns) {
        fns.forEach(run);
    }
    function is_function(thing) {
        return typeof thing === 'function';
    }
    function safe_not_equal(a, b) {
        return a != a ? b == b : a !== b || ((a && typeof a === 'object') || typeof a === 'function');
    }
    function is_empty(obj) {
        return Object.keys(obj).length === 0;
    }
    function null_to_empty(value) {
        return value == null ? '' : value;
    }

    function append(target, node) {
        target.appendChild(node);
    }
    function insert(target, node, anchor) {
        target.insertBefore(node, anchor || null);
    }
    function detach(node) {
        node.parentNode.removeChild(node);
    }
    function destroy_each(iterations, detaching) {
        for (let i = 0; i < iterations.length; i += 1) {
            if (iterations[i])
                iterations[i].d(detaching);
        }
    }
    function element(name) {
        return document.createElement(name);
    }
    function text(data) {
        return document.createTextNode(data);
    }
    function space() {
        return text(' ');
    }
    function empty() {
        return text('');
    }
    function listen(node, event, handler, options) {
        node.addEventListener(event, handler, options);
        return () => node.removeEventListener(event, handler, options);
    }
    function prevent_default(fn) {
        return function (event) {
            event.preventDefault();
            // @ts-ignore
            return fn.call(this, event);
        };
    }
    function attr(node, attribute, value) {
        if (value == null)
            node.removeAttribute(attribute);
        else if (node.getAttribute(attribute) !== value)
            node.setAttribute(attribute, value);
    }
    function children(element) {
        return Array.from(element.childNodes);
    }
    function set_input_value(input, value) {
        input.value = value == null ? '' : value;
    }
    function set_style(node, key, value, important) {
        node.style.setProperty(key, value, important ? 'important' : '');
    }
    function custom_event(type, detail) {
        const e = document.createEvent('CustomEvent');
        e.initCustomEvent(type, false, false, detail);
        return e;
    }

    let current_component;
    function set_current_component(component) {
        current_component = component;
    }
    function get_current_component() {
        if (!current_component)
            throw new Error('Function called outside component initialization');
        return current_component;
    }
    function createEventDispatcher() {
        const component = get_current_component();
        return (type, detail) => {
            const callbacks = component.$$.callbacks[type];
            if (callbacks) {
                // TODO are there situations where events could be dispatched
                // in a server (non-DOM) environment?
                const event = custom_event(type, detail);
                callbacks.slice().forEach(fn => {
                    fn.call(component, event);
                });
            }
        };
    }
    // TODO figure out if we still want to support
    // shorthand events, or if we want to implement
    // a real bubbling mechanism
    function bubble(component, event) {
        const callbacks = component.$$.callbacks[event.type];
        if (callbacks) {
            callbacks.slice().forEach(fn => fn(event));
        }
    }

    const dirty_components = [];
    const binding_callbacks = [];
    const render_callbacks = [];
    const flush_callbacks = [];
    const resolved_promise = Promise.resolve();
    let update_scheduled = false;
    function schedule_update() {
        if (!update_scheduled) {
            update_scheduled = true;
            resolved_promise.then(flush);
        }
    }
    function add_render_callback(fn) {
        render_callbacks.push(fn);
    }
    function add_flush_callback(fn) {
        flush_callbacks.push(fn);
    }
    let flushing = false;
    const seen_callbacks = new Set();
    function flush() {
        if (flushing)
            return;
        flushing = true;
        do {
            // first, call beforeUpdate functions
            // and update components
            for (let i = 0; i < dirty_components.length; i += 1) {
                const component = dirty_components[i];
                set_current_component(component);
                update(component.$$);
            }
            set_current_component(null);
            dirty_components.length = 0;
            while (binding_callbacks.length)
                binding_callbacks.pop()();
            // then, once components are updated, call
            // afterUpdate functions. This may cause
            // subsequent updates...
            for (let i = 0; i < render_callbacks.length; i += 1) {
                const callback = render_callbacks[i];
                if (!seen_callbacks.has(callback)) {
                    // ...so guard against infinite loops
                    seen_callbacks.add(callback);
                    callback();
                }
            }
            render_callbacks.length = 0;
        } while (dirty_components.length);
        while (flush_callbacks.length) {
            flush_callbacks.pop()();
        }
        update_scheduled = false;
        flushing = false;
        seen_callbacks.clear();
    }
    function update($$) {
        if ($$.fragment !== null) {
            $$.update();
            run_all($$.before_update);
            const dirty = $$.dirty;
            $$.dirty = [-1];
            $$.fragment && $$.fragment.p($$.ctx, dirty);
            $$.after_update.forEach(add_render_callback);
        }
    }
    const outroing = new Set();
    let outros;
    function group_outros() {
        outros = {
            r: 0,
            c: [],
            p: outros // parent group
        };
    }
    function check_outros() {
        if (!outros.r) {
            run_all(outros.c);
        }
        outros = outros.p;
    }
    function transition_in(block, local) {
        if (block && block.i) {
            outroing.delete(block);
            block.i(local);
        }
    }
    function transition_out(block, local, detach, callback) {
        if (block && block.o) {
            if (outroing.has(block))
                return;
            outroing.add(block);
            outros.c.push(() => {
                outroing.delete(block);
                if (callback) {
                    if (detach)
                        block.d(1);
                    callback();
                }
            });
            block.o(local);
        }
    }

    const globals = (typeof window !== 'undefined'
        ? window
        : typeof globalThis !== 'undefined'
            ? globalThis
            : global);

    function bind(component, name, callback) {
        const index = component.$$.props[name];
        if (index !== undefined) {
            component.$$.bound[index] = callback;
            callback(component.$$.ctx[index]);
        }
    }
    function create_component(block) {
        block && block.c();
    }
    function mount_component(component, target, anchor) {
        const { fragment, on_mount, on_destroy, after_update } = component.$$;
        fragment && fragment.m(target, anchor);
        // onMount happens before the initial afterUpdate
        add_render_callback(() => {
            const new_on_destroy = on_mount.map(run).filter(is_function);
            if (on_destroy) {
                on_destroy.push(...new_on_destroy);
            }
            else {
                // Edge case - component was destroyed immediately,
                // most likely as a result of a binding initialising
                run_all(new_on_destroy);
            }
            component.$$.on_mount = [];
        });
        after_update.forEach(add_render_callback);
    }
    function destroy_component(component, detaching) {
        const $$ = component.$$;
        if ($$.fragment !== null) {
            run_all($$.on_destroy);
            $$.fragment && $$.fragment.d(detaching);
            // TODO null out other refs, including component.$$ (but need to
            // preserve final state?)
            $$.on_destroy = $$.fragment = null;
            $$.ctx = [];
        }
    }
    function make_dirty(component, i) {
        if (component.$$.dirty[0] === -1) {
            dirty_components.push(component);
            schedule_update();
            component.$$.dirty.fill(0);
        }
        component.$$.dirty[(i / 31) | 0] |= (1 << (i % 31));
    }
    function init(component, options, instance, create_fragment, not_equal, props, dirty = [-1]) {
        const parent_component = current_component;
        set_current_component(component);
        const prop_values = options.props || {};
        const $$ = component.$$ = {
            fragment: null,
            ctx: null,
            // state
            props,
            update: noop,
            not_equal,
            bound: blank_object(),
            // lifecycle
            on_mount: [],
            on_destroy: [],
            before_update: [],
            after_update: [],
            context: new Map(parent_component ? parent_component.$$.context : []),
            // everything else
            callbacks: blank_object(),
            dirty,
            skip_bound: false
        };
        let ready = false;
        $$.ctx = instance
            ? instance(component, prop_values, (i, ret, ...rest) => {
                const value = rest.length ? rest[0] : ret;
                if ($$.ctx && not_equal($$.ctx[i], $$.ctx[i] = value)) {
                    if (!$$.skip_bound && $$.bound[i])
                        $$.bound[i](value);
                    if (ready)
                        make_dirty(component, i);
                }
                return ret;
            })
            : [];
        $$.update();
        ready = true;
        run_all($$.before_update);
        // `false` as a special case of no DOM component
        $$.fragment = create_fragment ? create_fragment($$.ctx) : false;
        if (options.target) {
            if (options.hydrate) {
                const nodes = children(options.target);
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                $$.fragment && $$.fragment.l(nodes);
                nodes.forEach(detach);
            }
            else {
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                $$.fragment && $$.fragment.c();
            }
            if (options.intro)
                transition_in(component.$$.fragment);
            mount_component(component, options.target, options.anchor);
            flush();
        }
        set_current_component(parent_component);
    }
    class SvelteComponent {
        $destroy() {
            destroy_component(this, 1);
            this.$destroy = noop;
        }
        $on(type, callback) {
            const callbacks = (this.$$.callbacks[type] || (this.$$.callbacks[type] = []));
            callbacks.push(callback);
            return () => {
                const index = callbacks.indexOf(callback);
                if (index !== -1)
                    callbacks.splice(index, 1);
            };
        }
        $set($$props) {
            if (this.$$set && !is_empty($$props)) {
                this.$$.skip_bound = true;
                this.$$set($$props);
                this.$$.skip_bound = false;
            }
        }
    }

    function dispatch_dev(type, detail) {
        document.dispatchEvent(custom_event(type, Object.assign({ version: '3.29.7' }, detail)));
    }
    function append_dev(target, node) {
        dispatch_dev('SvelteDOMInsert', { target, node });
        append(target, node);
    }
    function insert_dev(target, node, anchor) {
        dispatch_dev('SvelteDOMInsert', { target, node, anchor });
        insert(target, node, anchor);
    }
    function detach_dev(node) {
        dispatch_dev('SvelteDOMRemove', { node });
        detach(node);
    }
    function listen_dev(node, event, handler, options, has_prevent_default, has_stop_propagation) {
        const modifiers = options === true ? ['capture'] : options ? Array.from(Object.keys(options)) : [];
        if (has_prevent_default)
            modifiers.push('preventDefault');
        if (has_stop_propagation)
            modifiers.push('stopPropagation');
        dispatch_dev('SvelteDOMAddEventListener', { node, event, handler, modifiers });
        const dispose = listen(node, event, handler, options);
        return () => {
            dispatch_dev('SvelteDOMRemoveEventListener', { node, event, handler, modifiers });
            dispose();
        };
    }
    function attr_dev(node, attribute, value) {
        attr(node, attribute, value);
        if (value == null)
            dispatch_dev('SvelteDOMRemoveAttribute', { node, attribute });
        else
            dispatch_dev('SvelteDOMSetAttribute', { node, attribute, value });
    }
    function set_data_dev(text, data) {
        data = '' + data;
        if (text.wholeText === data)
            return;
        dispatch_dev('SvelteDOMSetData', { node: text, data });
        text.data = data;
    }
    function validate_each_argument(arg) {
        if (typeof arg !== 'string' && !(arg && typeof arg === 'object' && 'length' in arg)) {
            let msg = '{#each} only iterates over array-like objects.';
            if (typeof Symbol === 'function' && arg && Symbol.iterator in arg) {
                msg += ' You can use a spread to convert this iterable into an array.';
            }
            throw new Error(msg);
        }
    }
    function validate_slots(name, slot, keys) {
        for (const slot_key of Object.keys(slot)) {
            if (!~keys.indexOf(slot_key)) {
                console.warn(`<${name}> received an unexpected slot "${slot_key}".`);
            }
        }
    }
    class SvelteComponentDev extends SvelteComponent {
        constructor(options) {
            if (!options || (!options.target && !options.$$inline)) {
                throw new Error("'target' is a required option");
            }
            super();
        }
        $destroy() {
            super.$destroy();
            this.$destroy = () => {
                console.warn('Component was already destroyed'); // eslint-disable-line no-console
            };
        }
        $capture_state() { }
        $inject_state() { }
    }

    /* src/Livro.svelte generated by Svelte v3.29.7 */

    const file = "src/Livro.svelte";

    function create_fragment(ctx) {
    	let img;
    	let img_src_value;
    	let img_width_value;
    	let img_height_value;
    	let t0;
    	let h1;
    	let t1;
    	let t2;
    	let h2;
    	let t3;
    	let t4;
    	let h4;
    	let t6;
    	let p;
    	let t7;

    	const block = {
    		c: function create() {
    			img = element("img");
    			t0 = space();
    			h1 = element("h1");
    			t1 = text(/*statement*/ ctx[0]);
    			t2 = space();
    			h2 = element("h2");
    			t3 = text(/*autor*/ ctx[1]);
    			t4 = space();
    			h4 = element("h4");
    			h4.textContent = `${/*header*/ ctx[4]}`;
    			t6 = space();
    			p = element("p");
    			t7 = text(/*descricao*/ ctx[2]);
    			if (img.src !== (img_src_value = /*imagem*/ ctx[3])) attr_dev(img, "src", img_src_value);
    			attr_dev(img, "alt", "Falha ao carregar");
    			attr_dev(img, "width", img_width_value = 100);
    			attr_dev(img, "height", img_height_value = 140);
    			add_location(img, file, 0, 0, 0);
    			add_location(h1, file, 1, 0, 70);
    			add_location(h2, file, 2, 0, 94);
    			add_location(h4, file, 3, 0, 114);
    			add_location(p, file, 4, 0, 135);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, img, anchor);
    			insert_dev(target, t0, anchor);
    			insert_dev(target, h1, anchor);
    			append_dev(h1, t1);
    			insert_dev(target, t2, anchor);
    			insert_dev(target, h2, anchor);
    			append_dev(h2, t3);
    			insert_dev(target, t4, anchor);
    			insert_dev(target, h4, anchor);
    			insert_dev(target, t6, anchor);
    			insert_dev(target, p, anchor);
    			append_dev(p, t7);
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*imagem*/ 8 && img.src !== (img_src_value = /*imagem*/ ctx[3])) {
    				attr_dev(img, "src", img_src_value);
    			}

    			if (dirty & /*statement*/ 1) set_data_dev(t1, /*statement*/ ctx[0]);
    			if (dirty & /*autor*/ 2) set_data_dev(t3, /*autor*/ ctx[1]);
    			if (dirty & /*descricao*/ 4) set_data_dev(t7, /*descricao*/ ctx[2]);
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(img);
    			if (detaching) detach_dev(t0);
    			if (detaching) detach_dev(h1);
    			if (detaching) detach_dev(t2);
    			if (detaching) detach_dev(h2);
    			if (detaching) detach_dev(t4);
    			if (detaching) detach_dev(h4);
    			if (detaching) detach_dev(t6);
    			if (detaching) detach_dev(p);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots("Livro", slots, []);
    	let header = "Descrição";
    	let { statement } = $$props;
    	let { autor } = $$props;
    	let { descricao } = $$props;
    	let { imagem } = $$props;
    	const writable_props = ["statement", "autor", "descricao", "imagem"];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<Livro> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ("statement" in $$props) $$invalidate(0, statement = $$props.statement);
    		if ("autor" in $$props) $$invalidate(1, autor = $$props.autor);
    		if ("descricao" in $$props) $$invalidate(2, descricao = $$props.descricao);
    		if ("imagem" in $$props) $$invalidate(3, imagem = $$props.imagem);
    	};

    	$$self.$capture_state = () => ({
    		header,
    		statement,
    		autor,
    		descricao,
    		imagem
    	});

    	$$self.$inject_state = $$props => {
    		if ("header" in $$props) $$invalidate(4, header = $$props.header);
    		if ("statement" in $$props) $$invalidate(0, statement = $$props.statement);
    		if ("autor" in $$props) $$invalidate(1, autor = $$props.autor);
    		if ("descricao" in $$props) $$invalidate(2, descricao = $$props.descricao);
    		if ("imagem" in $$props) $$invalidate(3, imagem = $$props.imagem);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [statement, autor, descricao, imagem, header];
    }

    class Livro extends SvelteComponentDev {
    	constructor(options) {
    		super(options);

    		init(this, options, instance, create_fragment, safe_not_equal, {
    			statement: 0,
    			autor: 1,
    			descricao: 2,
    			imagem: 3
    		});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Livro",
    			options,
    			id: create_fragment.name
    		});

    		const { ctx } = this.$$;
    		const props = options.props || {};

    		if (/*statement*/ ctx[0] === undefined && !("statement" in props)) {
    			console.warn("<Livro> was created without expected prop 'statement'");
    		}

    		if (/*autor*/ ctx[1] === undefined && !("autor" in props)) {
    			console.warn("<Livro> was created without expected prop 'autor'");
    		}

    		if (/*descricao*/ ctx[2] === undefined && !("descricao" in props)) {
    			console.warn("<Livro> was created without expected prop 'descricao'");
    		}

    		if (/*imagem*/ ctx[3] === undefined && !("imagem" in props)) {
    			console.warn("<Livro> was created without expected prop 'imagem'");
    		}
    	}

    	get statement() {
    		throw new Error("<Livro>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set statement(value) {
    		throw new Error("<Livro>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get autor() {
    		throw new Error("<Livro>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set autor(value) {
    		throw new Error("<Livro>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get descricao() {
    		throw new Error("<Livro>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set descricao(value) {
    		throw new Error("<Livro>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get imagem() {
    		throw new Error("<Livro>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set imagem(value) {
    		throw new Error("<Livro>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src/Biblioteca.svelte generated by Svelte v3.29.7 */
    const file$1 = "src/Biblioteca.svelte";

    function create_fragment$1(ctx) {
    	let livro;
    	let t0;
    	let button0;
    	let t2;
    	let button1;
    	let current;
    	let mounted;
    	let dispose;

    	livro = new Livro({
    			props: {
    				statement: /*livros*/ ctx[1][/*current*/ ctx[0]].statement,
    				autor: /*livros*/ ctx[1][/*current*/ ctx[0]].autor,
    				descricao: /*livros*/ ctx[1][/*current*/ ctx[0]].descricao,
    				imagem: /*livros*/ ctx[1][/*current*/ ctx[0]].imagem
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(livro.$$.fragment);
    			t0 = space();
    			button0 = element("button");
    			button0.textContent = "Anterior";
    			t2 = space();
    			button1 = element("button");
    			button1.textContent = "Próximo";
    			add_location(button0, file$1, 1, 0, 148);
    			add_location(button1, file$1, 2, 0, 191);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			mount_component(livro, target, anchor);
    			insert_dev(target, t0, anchor);
    			insert_dev(target, button0, anchor);
    			insert_dev(target, t2, anchor);
    			insert_dev(target, button1, anchor);
    			current = true;

    			if (!mounted) {
    				dispose = [
    					listen_dev(button0, "click", /*prev*/ ctx[3], false, false, false),
    					listen_dev(button1, "click", /*next*/ ctx[2], false, false, false)
    				];

    				mounted = true;
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			const livro_changes = {};
    			if (dirty & /*current*/ 1) livro_changes.statement = /*livros*/ ctx[1][/*current*/ ctx[0]].statement;
    			if (dirty & /*current*/ 1) livro_changes.autor = /*livros*/ ctx[1][/*current*/ ctx[0]].autor;
    			if (dirty & /*current*/ 1) livro_changes.descricao = /*livros*/ ctx[1][/*current*/ ctx[0]].descricao;
    			if (dirty & /*current*/ 1) livro_changes.imagem = /*livros*/ ctx[1][/*current*/ ctx[0]].imagem;
    			livro.$set(livro_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(livro.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(livro.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(livro, detaching);
    			if (detaching) detach_dev(t0);
    			if (detaching) detach_dev(button0);
    			if (detaching) detach_dev(t2);
    			if (detaching) detach_dev(button1);
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$1.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$1($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots("Biblioteca", slots, []);

    	const livros = [
    		{
    			statement: "Dom Casmurro",
    			autor: "Machado de Assis",
    			imagem: "https://livralivro.com.br/uploads/book/img/759/8525406759.jpg",
    			descricao: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent sodales felis nec lacinia dapibus. Praesent tempus turpis ipsum, sit amet iaculis nisi tempor sed. Donec sit amet justo eu dolor varius consequat sit amet non felis. Cras luctus convallis blandit. Donec eget iaculis ipsum. Phasellus ligula neque, convallis in dictum ac, cursus non neque. Integer sit amet convallis turpis, in fringilla tortor. Curabitur interdum neque sed volutpat vestibulum. Aliquam erat volutpat. Nulla sit amet pulvinar orci, at pellentesque dolor. Proin fringilla id felis sed egestas. Aliquam molestie sit amet orci ac consequat."
    		},
    		{
    			statement: "Senhora",
    			autor: "José de Alencar",
    			imagem: "https://livralivro.com.br/uploads/book/img/759/8525406759.jpg",
    			descricao: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent sodales felis nec lacinia dapibus. Praesent tempus turpis ipsum, sit amet iaculis nisi tempor sed. Donec sit amet justo eu dolor varius consequat sit amet non felis. Cras luctus convallis blandit. Donec eget iaculis ipsum. Phasellus ligula neque, convallis in dictum ac, cursus non neque. Integer sit amet convallis turpis, in fringilla tortor. Curabitur interdum neque sed volutpat vestibulum. Aliquam erat volutpat. Nulla sit amet pulvinar orci, at pellentesque dolor. Proin fringilla id felis sed egestas. Aliquam molestie sit amet orci ac consequat."
    		},
    		{
    			statement: "Horto",
    			autor: "Auta de Souza",
    			imagem: "https://livralivro.com.br/uploads/book/img/759/8525406759.jpg",
    			descricao: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent sodales felis nec lacinia dapibus. Praesent tempus turpis ipsum, sit amet iaculis nisi tempor sed. Donec sit amet justo eu dolor varius consequat sit amet non felis. Cras luctus convallis blandit. Donec eget iaculis ipsum. Phasellus ligula neque, convallis in dictum ac, cursus non neque. Integer sit amet convallis turpis, in fringilla tortor. Curabitur interdum neque sed volutpat vestibulum. Aliquam erat volutpat. Nulla sit amet pulvinar orci, at pellentesque dolor. Proin fringilla id felis sed egestas. Aliquam molestie sit amet orci ac consequat."
    		},
    		{
    			statement: "Viagem ao céu",
    			autor: "Monteiro Lobato",
    			imagem: "https://livralivro.com.br/uploads/book/img/759/8525406759.jpg",
    			descricao: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent sodales felis nec lacinia dapibus. Praesent tempus turpis ipsum, sit amet iaculis nisi tempor sed. Donec sit amet justo eu dolor varius consequat sit amet non felis. Cras luctus convallis blandit. Donec eget iaculis ipsum. Phasellus ligula neque, convallis in dictum ac, cursus non neque. Integer sit amet convallis turpis, in fringilla tortor. Curabitur interdum neque sed volutpat vestibulum. Aliquam erat volutpat. Nulla sit amet pulvinar orci, at pellentesque dolor. Proin fringilla id felis sed egestas. Aliquam molestie sit amet orci ac consequat."
    		}
    	];

    	let current = 0;

    	function next() {
    		if (current < livros.length - 1) {
    			$$invalidate(0, current++, current);
    		} else {
    			$$invalidate(0, current = 0);
    		}
    	}

    	function prev() {
    		if (current != 0) {
    			$$invalidate(0, current--, current);
    		} else {
    			$$invalidate(0, current = livros.length - 1);
    		}
    	}

    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<Biblioteca> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({ Livro, livros, current, next, prev });

    	$$self.$inject_state = $$props => {
    		if ("current" in $$props) $$invalidate(0, current = $$props.current);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [current, livros, next, prev];
    }

    class Biblioteca extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$1, create_fragment$1, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Biblioteca",
    			options,
    			id: create_fragment$1.name
    		});
    	}
    }

    function requiredValidation(value) {
      if (!value || value.trim() === '') {
        return 'Este campo é obrigatório'
      }
      return null
    }

    /* src/Input.svelte generated by Svelte v3.29.7 */

    const file$2 = "src/Input.svelte";

    // (4:2) {#if isRequired}
    function create_if_block_1(ctx) {
    	let span;

    	const block = {
    		c: function create() {
    			span = element("span");
    			span.textContent = "*";
    			set_style(span, "color", "red");
    			add_location(span, file$2, 4, 2, 66);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, span, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(span);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_1.name,
    		type: "if",
    		source: "(4:2) {#if isRequired}",
    		ctx
    	});

    	return block;
    }

    // (11:2) {:else}
    function create_else_block(ctx) {
    	let input;
    	let input_class_value;
    	let mounted;
    	let dispose;

    	const block = {
    		c: function create() {
    			input = element("input");
    			attr_dev(input, "type", "text");
    			attr_dev(input, "class", input_class_value = "" + (null_to_empty(/*error*/ ctx[5] ? "input-error" : "") + " svelte-v1berz"));
    			attr_dev(input, "placeholder", /*placeholder*/ ctx[3]);
    			add_location(input, file$2, 11, 4, 277);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, input, anchor);
    			set_input_value(input, /*value*/ ctx[0]);

    			if (!mounted) {
    				dispose = [
    					listen_dev(input, "input", /*input_input_handler*/ ctx[11]),
    					listen_dev(input, "input", /*input_handler_1*/ ctx[8], false, false, false),
    					listen_dev(input, "blur", /*blur_handler_1*/ ctx[9], false, false, false)
    				];

    				mounted = true;
    			}
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*error*/ 32 && input_class_value !== (input_class_value = "" + (null_to_empty(/*error*/ ctx[5] ? "input-error" : "") + " svelte-v1berz"))) {
    				attr_dev(input, "class", input_class_value);
    			}

    			if (dirty & /*placeholder*/ 8) {
    				attr_dev(input, "placeholder", /*placeholder*/ ctx[3]);
    			}

    			if (dirty & /*value*/ 1 && input.value !== /*value*/ ctx[0]) {
    				set_input_value(input, /*value*/ ctx[0]);
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(input);
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_else_block.name,
    		type: "else",
    		source: "(11:2) {:else}",
    		ctx
    	});

    	return block;
    }

    // (9:2) {#if type === 'textarea'}
    function create_if_block(ctx) {
    	let textarea;
    	let textarea_class_value;
    	let mounted;
    	let dispose;

    	const block = {
    		c: function create() {
    			textarea = element("textarea");
    			attr_dev(textarea, "rows", "4");
    			attr_dev(textarea, "class", textarea_class_value = "" + (null_to_empty(/*error*/ ctx[5] ? "input-error" : "") + " svelte-v1berz"));
    			attr_dev(textarea, "placeholder", /*placeholder*/ ctx[3]);
    			add_location(textarea, file$2, 9, 2, 155);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, textarea, anchor);
    			set_input_value(textarea, /*value*/ ctx[0]);

    			if (!mounted) {
    				dispose = [
    					listen_dev(textarea, "input", /*textarea_input_handler*/ ctx[10]),
    					listen_dev(textarea, "input", /*input_handler*/ ctx[6], false, false, false),
    					listen_dev(textarea, "blur", /*blur_handler*/ ctx[7], false, false, false)
    				];

    				mounted = true;
    			}
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*error*/ 32 && textarea_class_value !== (textarea_class_value = "" + (null_to_empty(/*error*/ ctx[5] ? "input-error" : "") + " svelte-v1berz"))) {
    				attr_dev(textarea, "class", textarea_class_value);
    			}

    			if (dirty & /*placeholder*/ 8) {
    				attr_dev(textarea, "placeholder", /*placeholder*/ ctx[3]);
    			}

    			if (dirty & /*value*/ 1) {
    				set_input_value(textarea, /*value*/ ctx[0]);
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(textarea);
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block.name,
    		type: "if",
    		source: "(9:2) {#if type === 'textarea'}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$2(ctx) {
    	let div2;
    	let label_1;
    	let t0;
    	let t1;
    	let t2;
    	let div1;
    	let t3;
    	let div0;
    	let t4_value = (/*error*/ ctx[5] || "") + "";
    	let t4;
    	let if_block0 = /*isRequired*/ ctx[4] && create_if_block_1(ctx);

    	function select_block_type(ctx, dirty) {
    		if (/*type*/ ctx[1] === "textarea") return create_if_block;
    		return create_else_block;
    	}

    	let current_block_type = select_block_type(ctx);
    	let if_block1 = current_block_type(ctx);

    	const block = {
    		c: function create() {
    			div2 = element("div");
    			label_1 = element("label");
    			t0 = text(/*label*/ ctx[2]);
    			t1 = space();
    			if (if_block0) if_block0.c();
    			t2 = space();
    			div1 = element("div");
    			if_block1.c();
    			t3 = space();
    			div0 = element("div");
    			t4 = text(t4_value);
    			attr_dev(label_1, "class", "svelte-v1berz");
    			add_location(label_1, file$2, 1, 1, 25);
    			attr_dev(div0, "class", "error svelte-v1berz");
    			add_location(div0, file$2, 19, 4, 446);
    			add_location(div1, file$2, 7, 1, 119);
    			attr_dev(div2, "class", "form-item svelte-v1berz");
    			add_location(div2, file$2, 0, 0, 0);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div2, anchor);
    			append_dev(div2, label_1);
    			append_dev(label_1, t0);
    			append_dev(label_1, t1);
    			if (if_block0) if_block0.m(label_1, null);
    			append_dev(div2, t2);
    			append_dev(div2, div1);
    			if_block1.m(div1, null);
    			append_dev(div1, t3);
    			append_dev(div1, div0);
    			append_dev(div0, t4);
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*label*/ 4) set_data_dev(t0, /*label*/ ctx[2]);

    			if (/*isRequired*/ ctx[4]) {
    				if (if_block0) ; else {
    					if_block0 = create_if_block_1(ctx);
    					if_block0.c();
    					if_block0.m(label_1, null);
    				}
    			} else if (if_block0) {
    				if_block0.d(1);
    				if_block0 = null;
    			}

    			if (current_block_type === (current_block_type = select_block_type(ctx)) && if_block1) {
    				if_block1.p(ctx, dirty);
    			} else {
    				if_block1.d(1);
    				if_block1 = current_block_type(ctx);

    				if (if_block1) {
    					if_block1.c();
    					if_block1.m(div1, t3);
    				}
    			}

    			if (dirty & /*error*/ 32 && t4_value !== (t4_value = (/*error*/ ctx[5] || "") + "")) set_data_dev(t4, t4_value);
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div2);
    			if (if_block0) if_block0.d();
    			if_block1.d();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$2.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$2($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots("Input", slots, []);
    	let { type = "input" } = $$props;
    	let { label = "" } = $$props;
    	let { placeholder = "" } = $$props;
    	let { value = "" } = $$props;
    	let { isRequired = false } = $$props;
    	let { error = "" } = $$props;
    	const writable_props = ["type", "label", "placeholder", "value", "isRequired", "error"];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<Input> was created with unknown prop '${key}'`);
    	});

    	function input_handler(event) {
    		bubble($$self, event);
    	}

    	function blur_handler(event) {
    		bubble($$self, event);
    	}

    	function input_handler_1(event) {
    		bubble($$self, event);
    	}

    	function blur_handler_1(event) {
    		bubble($$self, event);
    	}

    	function textarea_input_handler() {
    		value = this.value;
    		$$invalidate(0, value);
    	}

    	function input_input_handler() {
    		value = this.value;
    		$$invalidate(0, value);
    	}

    	$$self.$$set = $$props => {
    		if ("type" in $$props) $$invalidate(1, type = $$props.type);
    		if ("label" in $$props) $$invalidate(2, label = $$props.label);
    		if ("placeholder" in $$props) $$invalidate(3, placeholder = $$props.placeholder);
    		if ("value" in $$props) $$invalidate(0, value = $$props.value);
    		if ("isRequired" in $$props) $$invalidate(4, isRequired = $$props.isRequired);
    		if ("error" in $$props) $$invalidate(5, error = $$props.error);
    	};

    	$$self.$capture_state = () => ({
    		type,
    		label,
    		placeholder,
    		value,
    		isRequired,
    		error
    	});

    	$$self.$inject_state = $$props => {
    		if ("type" in $$props) $$invalidate(1, type = $$props.type);
    		if ("label" in $$props) $$invalidate(2, label = $$props.label);
    		if ("placeholder" in $$props) $$invalidate(3, placeholder = $$props.placeholder);
    		if ("value" in $$props) $$invalidate(0, value = $$props.value);
    		if ("isRequired" in $$props) $$invalidate(4, isRequired = $$props.isRequired);
    		if ("error" in $$props) $$invalidate(5, error = $$props.error);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [
    		value,
    		type,
    		label,
    		placeholder,
    		isRequired,
    		error,
    		input_handler,
    		blur_handler,
    		input_handler_1,
    		blur_handler_1,
    		textarea_input_handler,
    		input_input_handler
    	];
    }

    class Input extends SvelteComponentDev {
    	constructor(options) {
    		super(options);

    		init(this, options, instance$2, create_fragment$2, safe_not_equal, {
    			type: 1,
    			label: 2,
    			placeholder: 3,
    			value: 0,
    			isRequired: 4,
    			error: 5
    		});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Input",
    			options,
    			id: create_fragment$2.name
    		});
    	}

    	get type() {
    		throw new Error("<Input>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set type(value) {
    		throw new Error("<Input>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get label() {
    		throw new Error("<Input>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set label(value) {
    		throw new Error("<Input>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get placeholder() {
    		throw new Error("<Input>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set placeholder(value) {
    		throw new Error("<Input>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get value() {
    		throw new Error("<Input>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set value(value) {
    		throw new Error("<Input>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get isRequired() {
    		throw new Error("<Input>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set isRequired(value) {
    		throw new Error("<Input>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get error() {
    		throw new Error("<Input>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set error(value) {
    		throw new Error("<Input>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src/LivroForm.svelte generated by Svelte v3.29.7 */

    const { Object: Object_1 } = globals;
    const file$3 = "src/LivroForm.svelte";

    function create_fragment$3(ctx) {
    	let form;
    	let h2;
    	let t1;
    	let input0;
    	let updating_value;
    	let t2;
    	let input1;
    	let updating_value_1;
    	let t3;
    	let input2;
    	let updating_value_2;
    	let t4;
    	let input3;
    	let updating_value_3;
    	let t5;
    	let input4;
    	let t6;
    	let button;
    	let current;
    	let mounted;
    	let dispose;

    	function input0_value_binding(value) {
    		/*input0_value_binding*/ ctx[7].call(null, value);
    	}

    	let input0_props = {
    		label: "Título",
    		placeholder: "Digite o Título do livro",
    		isRequired: "true",
    		error: /*errors*/ ctx[0]["statement"]
    	};

    	if (/*book*/ ctx[2].statement !== void 0) {
    		input0_props.value = /*book*/ ctx[2].statement;
    	}

    	input0 = new Input({ props: input0_props, $$inline: true });
    	binding_callbacks.push(() => bind(input0, "value", input0_value_binding));

    	input0.$on("input", function () {
    		if (is_function(/*touched*/ ctx[1]["statement"] = true)) (/*touched*/ ctx[1]["statement"] = true).apply(this, arguments);
    	});

    	input0.$on("blur", /*blur_handler*/ ctx[8]);

    	function input1_value_binding(value) {
    		/*input1_value_binding*/ ctx[9].call(null, value);
    	}

    	let input1_props = {
    		label: "Autor",
    		placeholder: "Digite o nome do Autor",
    		isRequired: "true",
    		error: /*errors*/ ctx[0]["autor"]
    	};

    	if (/*book*/ ctx[2].autor !== void 0) {
    		input1_props.value = /*book*/ ctx[2].autor;
    	}

    	input1 = new Input({ props: input1_props, $$inline: true });
    	binding_callbacks.push(() => bind(input1, "value", input1_value_binding));
    	input1.$on("input", /*input_handler*/ ctx[10]);
    	input1.$on("blur", /*blur_handler_1*/ ctx[11]);

    	function input2_value_binding(value) {
    		/*input2_value_binding*/ ctx[12].call(null, value);
    	}

    	let input2_props = {
    		type: "textarea",
    		label: "Descrição",
    		placeholder: "Digite um breve resumo do livro",
    		error: /*errors*/ ctx[0]["descricao"]
    	};

    	if (/*book*/ ctx[2].descricao !== void 0) {
    		input2_props.value = /*book*/ ctx[2].descricao;
    	}

    	input2 = new Input({ props: input2_props, $$inline: true });
    	binding_callbacks.push(() => bind(input2, "value", input2_value_binding));
    	input2.$on("input", /*input_handler_1*/ ctx[13]);
    	input2.$on("blur", /*blur_handler_2*/ ctx[14]);

    	function input3_value_binding(value) {
    		/*input3_value_binding*/ ctx[15].call(null, value);
    	}

    	let input3_props = {
    		type: "textarea",
    		label: "Link",
    		placeholder: "Digite o link para download",
    		isRequired: "true"
    	};

    	if (/*book*/ ctx[2].imagem !== void 0) {
    		input3_props.value = /*book*/ ctx[2].imagem;
    	}

    	input3 = new Input({ props: input3_props, $$inline: true });
    	binding_callbacks.push(() => bind(input3, "value", input3_value_binding));
    	input3.$on("input", /*input_handler_2*/ ctx[16]);
    	input3.$on("blur", /*blur_handler_3*/ ctx[17]);

    	const block = {
    		c: function create() {
    			form = element("form");
    			h2 = element("h2");
    			h2.textContent = "Novo Cadastro";
    			t1 = space();
    			create_component(input0.$$.fragment);
    			t2 = space();
    			create_component(input1.$$.fragment);
    			t3 = space();
    			create_component(input2.$$.fragment);
    			t4 = space();
    			create_component(input3.$$.fragment);
    			t5 = space();
    			input4 = element("input");
    			t6 = space();
    			button = element("button");
    			button.textContent = "Cancelar";
    			add_location(h2, file$3, 1, 1, 42);
    			attr_dev(input4, "type", "submit");
    			input4.value = "Cadastrar";
    			add_location(input4, file$3, 10, 1, 910);
    			attr_dev(button, "type", "button");
    			add_location(button, file$3, 11, 1, 951);
    			add_location(form, file$3, 0, 0, 0);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, form, anchor);
    			append_dev(form, h2);
    			append_dev(form, t1);
    			mount_component(input0, form, null);
    			append_dev(form, t2);
    			mount_component(input1, form, null);
    			append_dev(form, t3);
    			mount_component(input2, form, null);
    			append_dev(form, t4);
    			mount_component(input3, form, null);
    			append_dev(form, t5);
    			append_dev(form, input4);
    			append_dev(form, t6);
    			append_dev(form, button);
    			current = true;

    			if (!mounted) {
    				dispose = [
    					listen_dev(button, "click", /*click_handler*/ ctx[18], false, false, false),
    					listen_dev(form, "submit", prevent_default(/*submit*/ ctx[5]), false, true, false)
    				];

    				mounted = true;
    			}
    		},
    		p: function update(new_ctx, [dirty]) {
    			ctx = new_ctx;
    			const input0_changes = {};
    			if (dirty & /*errors*/ 1) input0_changes.error = /*errors*/ ctx[0]["statement"];

    			if (!updating_value && dirty & /*book*/ 4) {
    				updating_value = true;
    				input0_changes.value = /*book*/ ctx[2].statement;
    				add_flush_callback(() => updating_value = false);
    			}

    			input0.$set(input0_changes);
    			const input1_changes = {};
    			if (dirty & /*errors*/ 1) input1_changes.error = /*errors*/ ctx[0]["autor"];

    			if (!updating_value_1 && dirty & /*book*/ 4) {
    				updating_value_1 = true;
    				input1_changes.value = /*book*/ ctx[2].autor;
    				add_flush_callback(() => updating_value_1 = false);
    			}

    			input1.$set(input1_changes);
    			const input2_changes = {};
    			if (dirty & /*errors*/ 1) input2_changes.error = /*errors*/ ctx[0]["descricao"];

    			if (!updating_value_2 && dirty & /*book*/ 4) {
    				updating_value_2 = true;
    				input2_changes.value = /*book*/ ctx[2].descricao;
    				add_flush_callback(() => updating_value_2 = false);
    			}

    			input2.$set(input2_changes);
    			const input3_changes = {};

    			if (!updating_value_3 && dirty & /*book*/ 4) {
    				updating_value_3 = true;
    				input3_changes.value = /*book*/ ctx[2].imagem;
    				add_flush_callback(() => updating_value_3 = false);
    			}

    			input3.$set(input3_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(input0.$$.fragment, local);
    			transition_in(input1.$$.fragment, local);
    			transition_in(input2.$$.fragment, local);
    			transition_in(input3.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(input0.$$.fragment, local);
    			transition_out(input1.$$.fragment, local);
    			transition_out(input2.$$.fragment, local);
    			transition_out(input3.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(form);
    			destroy_component(input0);
    			destroy_component(input1);
    			destroy_component(input2);
    			destroy_component(input3);
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$3.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$3($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots("LivroForm", slots, []);
    	let { livro } = $$props;

    	const validate = {
    		statement: requiredValidation,
    		autor: requiredValidation,
    		imagem: requiredValidation
    	};

    	let errors = {};
    	let touched = {};
    	const dispatch = createEventDispatcher();
    	const { statement, autor, descricao, imagem } = livro || {};
    	let book = { statement, autor, descricao, imagem };

    	function checkField(name) {
    		$$invalidate(0, errors[name] = "", errors);

    		if (validate[name] && touched[name]) {
    			const value = book[name];
    			$$invalidate(0, errors[name] = validate[name](value) || "", errors);
    		}
    	}

    	function submit() {
    		Object.keys(book).forEach(field => {
    			$$invalidate(1, touched[field] = true, touched);
    			checkField(field);
    		});

    		const errorsIsEmpty = !Object.values(errors).some(v => v);

    		if (errorsIsEmpty) {
    			dispatch("update", {
    				statement: book.statement,
    				autor: book.autor,
    				descricao: book.descricao,
    				imagem: book.imagem
    			});
    		}
    	}

    	const writable_props = ["livro"];

    	Object_1.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<LivroForm> was created with unknown prop '${key}'`);
    	});

    	function input0_value_binding(value) {
    		book.statement = value;
    		$$invalidate(2, book);
    	}

    	const blur_handler = e => checkField("statement");

    	function input1_value_binding(value) {
    		book.autor = value;
    		$$invalidate(2, book);
    	}

    	const input_handler = e => $$invalidate(1, touched["autor"] = true, touched);
    	const blur_handler_1 = e => checkField("autor");

    	function input2_value_binding(value) {
    		book.descricao = value;
    		$$invalidate(2, book);
    	}

    	const input_handler_1 = e => $$invalidate(1, touched["descricao"] = true, touched);
    	const blur_handler_2 = e => checkField("descricao");

    	function input3_value_binding(value) {
    		book.imagem = value;
    		$$invalidate(2, book);
    	}

    	const input_handler_2 = e => $$invalidate(1, touched["imagem"] = true, touched);
    	const blur_handler_3 = e => checkField("imagem");
    	const click_handler = e => dispatch("cancel");

    	$$self.$$set = $$props => {
    		if ("livro" in $$props) $$invalidate(6, livro = $$props.livro);
    	};

    	$$self.$capture_state = () => ({
    		requiredValidation,
    		createEventDispatcher,
    		Input,
    		livro,
    		validate,
    		errors,
    		touched,
    		dispatch,
    		statement,
    		autor,
    		descricao,
    		imagem,
    		book,
    		checkField,
    		submit
    	});

    	$$self.$inject_state = $$props => {
    		if ("livro" in $$props) $$invalidate(6, livro = $$props.livro);
    		if ("errors" in $$props) $$invalidate(0, errors = $$props.errors);
    		if ("touched" in $$props) $$invalidate(1, touched = $$props.touched);
    		if ("book" in $$props) $$invalidate(2, book = $$props.book);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [
    		errors,
    		touched,
    		book,
    		dispatch,
    		checkField,
    		submit,
    		livro,
    		input0_value_binding,
    		blur_handler,
    		input1_value_binding,
    		input_handler,
    		blur_handler_1,
    		input2_value_binding,
    		input_handler_1,
    		blur_handler_2,
    		input3_value_binding,
    		input_handler_2,
    		blur_handler_3,
    		click_handler
    	];
    }

    class LivroForm extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$3, create_fragment$3, safe_not_equal, { livro: 6 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "LivroForm",
    			options,
    			id: create_fragment$3.name
    		});

    		const { ctx } = this.$$;
    		const props = options.props || {};

    		if (/*livro*/ ctx[6] === undefined && !("livro" in props)) {
    			console.warn("<LivroForm> was created without expected prop 'livro'");
    		}
    	}

    	get livro() {
    		throw new Error("<LivroForm>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set livro(value) {
    		throw new Error("<LivroForm>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src/ListaLivro.svelte generated by Svelte v3.29.7 */
    const file$4 = "src/ListaLivro.svelte";

    function get_each_context(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[7] = list[i];
    	child_ctx[9] = i;
    	return child_ctx;
    }

    // (13:0) {:else}
    function create_else_block$1(ctx) {
    	let livroform;
    	let current;

    	livroform = new LivroForm({
    			props: {
    				livro: /*livros*/ ctx[2][/*current*/ ctx[1]]
    			},
    			$$inline: true
    		});

    	livroform.$on("update", /*updateChanges*/ ctx[4]);
    	livroform.$on("cancel", /*cancelChanges*/ ctx[5]);

    	const block = {
    		c: function create() {
    			create_component(livroform.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(livroform, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const livroform_changes = {};
    			if (dirty & /*livros, current*/ 6) livroform_changes.livro = /*livros*/ ctx[2][/*current*/ ctx[1]];
    			livroform.$set(livroform_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(livroform.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(livroform.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(livroform, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_else_block$1.name,
    		type: "else",
    		source: "(13:0) {:else}",
    		ctx
    	});

    	return block;
    }

    // (1:0) {#if mode === 'view'}
    function create_if_block$1(ctx) {
    	let t0;
    	let button;
    	let mounted;
    	let dispose;
    	let each_value = /*livros*/ ctx[2];
    	validate_each_argument(each_value);
    	let each_blocks = [];

    	for (let i = 0; i < each_value.length; i += 1) {
    		each_blocks[i] = create_each_block(get_each_context(ctx, each_value, i));
    	}

    	const block = {
    		c: function create() {
    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			t0 = space();
    			button = element("button");
    			button.textContent = "Cadastrar Novo";
    			add_location(button, file$4, 11, 0, 239);
    		},
    		m: function mount(target, anchor) {
    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(target, anchor);
    			}

    			insert_dev(target, t0, anchor);
    			insert_dev(target, button, anchor);

    			if (!mounted) {
    				dispose = listen_dev(button, "click", /*addLivro*/ ctx[3], false, false, false);
    				mounted = true;
    			}
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*livros*/ 4) {
    				each_value = /*livros*/ ctx[2];
    				validate_each_argument(each_value);
    				let i;

    				for (i = 0; i < each_value.length; i += 1) {
    					const child_ctx = get_each_context(ctx, each_value, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    					} else {
    						each_blocks[i] = create_each_block(child_ctx);
    						each_blocks[i].c();
    						each_blocks[i].m(t0.parentNode, t0);
    					}
    				}

    				for (; i < each_blocks.length; i += 1) {
    					each_blocks[i].d(1);
    				}

    				each_blocks.length = each_value.length;
    			}
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			destroy_each(each_blocks, detaching);
    			if (detaching) detach_dev(t0);
    			if (detaching) detach_dev(button);
    			mounted = false;
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$1.name,
    		type: "if",
    		source: "(1:0) {#if mode === 'view'}",
    		ctx
    	});

    	return block;
    }

    // (3:0) {#each livros as livro, index}
    function create_each_block(ctx) {
    	let p;
    	let b0;
    	let t1;
    	let t2_value = /*livro*/ ctx[7].statement + "";
    	let t2;
    	let t3;
    	let br0;
    	let t4;
    	let b1;
    	let t6_value = /*livro*/ ctx[7].autor + "";
    	let t6;
    	let t7;
    	let br1;
    	let t8;
    	let b2;
    	let a;
    	let t10_value = /*livro*/ ctx[7].imagem + "";
    	let t10;
    	let a_href_value;

    	const block = {
    		c: function create() {
    			p = element("p");
    			b0 = element("b");
    			b0.textContent = "Título:";
    			t1 = space();
    			t2 = text(t2_value);
    			t3 = space();
    			br0 = element("br");
    			t4 = space();
    			b1 = element("b");
    			b1.textContent = "Autor: ";
    			t6 = text(t6_value);
    			t7 = space();
    			br1 = element("br");
    			t8 = space();
    			b2 = element("b");
    			b2.textContent = "Donwload: ";
    			a = element("a");
    			t10 = text(t10_value);
    			add_location(b0, file$4, 4, 1, 59);
    			add_location(br0, file$4, 5, 1, 96);
    			add_location(b1, file$4, 6, 4, 107);
    			add_location(br1, file$4, 7, 4, 139);
    			add_location(b2, file$4, 8, 4, 149);
    			attr_dev(a, "href", a_href_value = /*livro*/ ctx[7].imagem);
    			attr_dev(a, "target", "_blank");
    			add_location(a, file$4, 8, 21, 166);
    			add_location(p, file$4, 3, 0, 54);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, p, anchor);
    			append_dev(p, b0);
    			append_dev(p, t1);
    			append_dev(p, t2);
    			append_dev(p, t3);
    			append_dev(p, br0);
    			append_dev(p, t4);
    			append_dev(p, b1);
    			append_dev(p, t6);
    			append_dev(p, t7);
    			append_dev(p, br1);
    			append_dev(p, t8);
    			append_dev(p, b2);
    			append_dev(p, a);
    			append_dev(a, t10);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*livros*/ 4 && t2_value !== (t2_value = /*livro*/ ctx[7].statement + "")) set_data_dev(t2, t2_value);
    			if (dirty & /*livros*/ 4 && t6_value !== (t6_value = /*livro*/ ctx[7].autor + "")) set_data_dev(t6, t6_value);
    			if (dirty & /*livros*/ 4 && t10_value !== (t10_value = /*livro*/ ctx[7].imagem + "")) set_data_dev(t10, t10_value);

    			if (dirty & /*livros*/ 4 && a_href_value !== (a_href_value = /*livro*/ ctx[7].imagem)) {
    				attr_dev(a, "href", a_href_value);
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(p);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block.name,
    		type: "each",
    		source: "(3:0) {#each livros as livro, index}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$4(ctx) {
    	let current_block_type_index;
    	let if_block;
    	let if_block_anchor;
    	let current;
    	const if_block_creators = [create_if_block$1, create_else_block$1];
    	const if_blocks = [];

    	function select_block_type(ctx, dirty) {
    		if (/*mode*/ ctx[0] === "view") return 0;
    		return 1;
    	}

    	current_block_type_index = select_block_type(ctx);
    	if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);

    	const block = {
    		c: function create() {
    			if_block.c();
    			if_block_anchor = empty();
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			if_blocks[current_block_type_index].m(target, anchor);
    			insert_dev(target, if_block_anchor, anchor);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			let previous_block_index = current_block_type_index;
    			current_block_type_index = select_block_type(ctx);

    			if (current_block_type_index === previous_block_index) {
    				if_blocks[current_block_type_index].p(ctx, dirty);
    			} else {
    				group_outros();

    				transition_out(if_blocks[previous_block_index], 1, 1, () => {
    					if_blocks[previous_block_index] = null;
    				});

    				check_outros();
    				if_block = if_blocks[current_block_type_index];

    				if (!if_block) {
    					if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
    					if_block.c();
    				} else {
    					if_block.p(ctx, dirty);
    				}

    				transition_in(if_block, 1);
    				if_block.m(if_block_anchor.parentNode, if_block_anchor);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(if_block);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(if_block);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if_blocks[current_block_type_index].d(detaching);
    			if (detaching) detach_dev(if_block_anchor);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$4.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$4($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots("ListaLivro", slots, []);
    	let mode = "view";
    	let current = null;
    	let livros = [];

    	function addLivro() {
    		$$invalidate(0, mode = "add");
    		$$invalidate(2, livros = [...livros, {}]);
    		$$invalidate(1, current = livros.length - 1);
    	}

    	function removeLivro(index) {
    		$$invalidate(2, livros = [...livros.slice(0, index), ...livros.slice(index + 1)]);
    	}

    	function updateChanges({ detail }) {
    		$$invalidate(2, livros[current] = detail, livros);
    		$$invalidate(0, mode = "view");
    	}

    	function cancelChanges() {
    		if (mode === "add") {
    			removeLivro(livros.length - 1);
    		}

    		$$invalidate(0, mode = "view");
    	}

    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<ListaLivro> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({
    		LivroForm,
    		mode,
    		current,
    		livros,
    		addLivro,
    		removeLivro,
    		updateChanges,
    		cancelChanges
    	});

    	$$self.$inject_state = $$props => {
    		if ("mode" in $$props) $$invalidate(0, mode = $$props.mode);
    		if ("current" in $$props) $$invalidate(1, current = $$props.current);
    		if ("livros" in $$props) $$invalidate(2, livros = $$props.livros);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [mode, current, livros, addLivro, updateChanges, cancelChanges];
    }

    class ListaLivro extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$4, create_fragment$4, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "ListaLivro",
    			options,
    			id: create_fragment$4.name
    		});
    	}
    }

    /* src/App.svelte generated by Svelte v3.29.7 */
    const file$5 = "src/App.svelte";

    function create_fragment$5(ctx) {
    	let main;
    	let body;
    	let div8;
    	let h10;
    	let t1;
    	let p;
    	let t3;
    	let div3;
    	let div0;
    	let img0;
    	let img0_src_value;
    	let img0_width_value;
    	let img0_height_value;
    	let t4;
    	let h30;
    	let t6;
    	let div1;
    	let img1;
    	let img1_src_value;
    	let img1_width_value;
    	let img1_height_value;
    	let t7;
    	let h31;
    	let t9;
    	let div2;
    	let img2;
    	let img2_src_value;
    	let img2_width_value;
    	let img2_height_value;
    	let t10;
    	let h32;
    	let t12;
    	let div7;
    	let div4;
    	let biblioteca;
    	let t13;
    	let div5;
    	let h11;
    	let t15;
    	let livroform;
    	let t16;
    	let div6;
    	let h12;
    	let t18;
    	let listalivro;
    	let current;
    	biblioteca = new Biblioteca({ $$inline: true });
    	livroform = new LivroForm({ $$inline: true });
    	listalivro = new ListaLivro({ $$inline: true });

    	const block = {
    		c: function create() {
    			main = element("main");
    			body = element("body");
    			div8 = element("div");
    			h10 = element("h1");
    			h10.textContent = "Biblioteca Virtual";
    			t1 = space();
    			p = element("p");
    			p.textContent = "Lorem ipsum dolor sit amet, consectetur adipiscing elit.\n            Praesent sodales felis nec lacinia dapibus.\n            Praesent tempus turpis ipsum, sit amet iaculis nisi tempor sed.\n            Donec sit amet justo eu dolor varius consequat sit amet non felis.\n            Cras luctus convallis blandit. Donec eget iaculis ipsum.\n            Phasellus ligula neque, convallis in dictum ac, cursus non neque.\n            Integer sit amet convallis turpis, in fringilla tortor.\n            Curabitur interdum neque sed volutpat vestibulum.\n            Aliquam erat volutpat. Nulla sit amet pulvinar orci, at pellentesque dolor.\n            Proin fringilla id felis sed egestas.\n            Aliquam molestie sit amet orci ac consequat.";
    			t3 = space();
    			div3 = element("div");
    			div0 = element("div");
    			img0 = element("img");
    			t4 = space();
    			h30 = element("h3");
    			h30.textContent = "Livros";
    			t6 = space();
    			div1 = element("div");
    			img1 = element("img");
    			t7 = space();
    			h31 = element("h3");
    			h31.textContent = "E-books";
    			t9 = space();
    			div2 = element("div");
    			img2 = element("img");
    			t10 = space();
    			h32 = element("h3");
    			h32.textContent = "Cadastro";
    			t12 = space();
    			div7 = element("div");
    			div4 = element("div");
    			create_component(biblioteca.$$.fragment);
    			t13 = space();
    			div5 = element("div");
    			h11 = element("h1");
    			h11.textContent = "Cadastro (Em manutenção)";
    			t15 = space();
    			create_component(livroform.$$.fragment);
    			t16 = space();
    			div6 = element("div");
    			h12 = element("h1");
    			h12.textContent = "E-books";
    			t18 = space();
    			create_component(listalivro.$$.fragment);
    			add_location(h10, file$5, 51, 12, 1087);
    			add_location(p, file$5, 52, 12, 1127);
    			attr_dev(img0, "class", "imagem svelte-wn6c1n");
    			if (img0.src !== (img0_src_value = "https://www.estudarfora.org.br/app/uploads/2013/10/20131029_livros_115791277-768x334.jpg")) attr_dev(img0, "src", img0_src_value);
    			attr_dev(img0, "alt", "Falha ao carregar");
    			attr_dev(img0, "width", img0_width_value = 150);
    			attr_dev(img0, "height", img0_height_value = 40);
    			add_location(img0, file$5, 67, 20, 1995);
    			add_location(h30, file$5, 68, 20, 2180);
    			attr_dev(div0, "class", "category svelte-wn6c1n");
    			add_location(div0, file$5, 66, 16, 1952);
    			attr_dev(img1, "class", "imagem svelte-wn6c1n");
    			if (img1.src !== (img1_src_value = "https://www.estudarfora.org.br/app/uploads/2013/10/20131029_livros_115791277-768x334.jpg")) attr_dev(img1, "src", img1_src_value);
    			attr_dev(img1, "alt", "Falha ao carregar");
    			attr_dev(img1, "width", img1_width_value = 150);
    			attr_dev(img1, "height", img1_height_value = 40);
    			add_location(img1, file$5, 71, 20, 2278);
    			add_location(h31, file$5, 72, 20, 2463);
    			attr_dev(div1, "class", "category svelte-wn6c1n");
    			add_location(div1, file$5, 70, 16, 2235);
    			attr_dev(img2, "class", "imagem svelte-wn6c1n");
    			if (img2.src !== (img2_src_value = "https://www.estudarfora.org.br/app/uploads/2013/10/20131029_livros_115791277-768x334.jpg")) attr_dev(img2, "src", img2_src_value);
    			attr_dev(img2, "alt", "Falha ao carregar");
    			attr_dev(img2, "width", img2_width_value = 150);
    			attr_dev(img2, "height", img2_height_value = 40);
    			add_location(img2, file$5, 75, 20, 2562);
    			add_location(h32, file$5, 76, 20, 2747);
    			attr_dev(div2, "class", "category svelte-wn6c1n");
    			add_location(div2, file$5, 74, 16, 2519);
    			attr_dev(div3, "class", "container svelte-wn6c1n");
    			add_location(div3, file$5, 65, 12, 1912);
    			attr_dev(div4, "class", "panel svelte-wn6c1n");
    			add_location(div4, file$5, 81, 12, 2838);
    			add_location(h11, file$5, 85, 16, 2955);
    			attr_dev(div5, "class", "panel svelte-wn6c1n");
    			add_location(div5, file$5, 84, 12, 2919);
    			add_location(h12, file$5, 89, 16, 3085);
    			attr_dev(div6, "class", "panel svelte-wn6c1n");
    			add_location(div6, file$5, 88, 12, 3049);
    			add_location(div7, file$5, 80, 12, 2820);
    			attr_dev(div8, "class", "principal svelte-wn6c1n");
    			add_location(div8, file$5, 50, 8, 1051);
    			attr_dev(body, "class", "svelte-wn6c1n");
    			add_location(body, file$5, 49, 4, 1036);
    			add_location(main, file$5, 48, 0, 1025);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, main, anchor);
    			append_dev(main, body);
    			append_dev(body, div8);
    			append_dev(div8, h10);
    			append_dev(div8, t1);
    			append_dev(div8, p);
    			append_dev(div8, t3);
    			append_dev(div8, div3);
    			append_dev(div3, div0);
    			append_dev(div0, img0);
    			append_dev(div0, t4);
    			append_dev(div0, h30);
    			append_dev(div3, t6);
    			append_dev(div3, div1);
    			append_dev(div1, img1);
    			append_dev(div1, t7);
    			append_dev(div1, h31);
    			append_dev(div3, t9);
    			append_dev(div3, div2);
    			append_dev(div2, img2);
    			append_dev(div2, t10);
    			append_dev(div2, h32);
    			append_dev(div8, t12);
    			append_dev(div8, div7);
    			append_dev(div7, div4);
    			mount_component(biblioteca, div4, null);
    			append_dev(div7, t13);
    			append_dev(div7, div5);
    			append_dev(div5, h11);
    			append_dev(div5, t15);
    			mount_component(livroform, div5, null);
    			append_dev(div7, t16);
    			append_dev(div7, div6);
    			append_dev(div6, h12);
    			append_dev(div6, t18);
    			mount_component(listalivro, div6, null);
    			current = true;
    		},
    		p: noop,
    		i: function intro(local) {
    			if (current) return;
    			transition_in(biblioteca.$$.fragment, local);
    			transition_in(livroform.$$.fragment, local);
    			transition_in(listalivro.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(biblioteca.$$.fragment, local);
    			transition_out(livroform.$$.fragment, local);
    			transition_out(listalivro.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(main);
    			destroy_component(biblioteca);
    			destroy_component(livroform);
    			destroy_component(listalivro);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$5.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$5($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots("App", slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<App> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({ Biblioteca, ListaLivro, LivroForm });
    	return [];
    }

    class App extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$5, create_fragment$5, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "App",
    			options,
    			id: create_fragment$5.name
    		});
    	}
    }

    const app = new App({
    	target: document.body,
    	props: {
    		name: 'world'
    	}
    });

    return app;

}());
//# sourceMappingURL=bundle.js.map
