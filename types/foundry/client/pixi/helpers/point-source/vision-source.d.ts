export {};

declare global {
	/**
	 * A specialized subclass of the PointSource abstraction which is used to control the rendering of vision sources.
	 * @param object The Token object that generates this vision source
	 */
	class VisionSource<TObject extends Token> extends PointSource<TObject> {
		/** The current background mesh for this source */
		background: PIXI.Mesh | null;

		/** The current vision illumination mesh for this source */
		illumination: PIXI.Mesh | null;

		/** The current vision coloration mesh for this source */
		coloration: PIXI.Mesh | null;

		/** The vision mode linked to this VisionSource */
		visionMode: VisionMode | null;

		constructor(object: TObject);

		static sourceType: 'vision';

		/** Keys in the VisionSourceData structure which, when modified, change the appearance of the source */
		protected static _appearanceKeys: string[];

		static override EDGE_OFFSET: number;

		/* -------------------------------------------- */
		/*  Vision Source Attributes                    */
		/* -------------------------------------------- */

		/** The object of data which configures how the source is rendered */
		data: VisionSourceData;

		/** The constrained LOS polygon that is generated by the origin and radius of this source. */
		fov: PointSourcePolygon;

		/** Track which uniforms need to be reset */
		protected _resetUniforms: Record<
			'background' | 'illumination' | 'coloration',
			boolean
		>;

		/** To track if a source is temporarily shutdown to avoid glitches */
		protected _shutdown: Record<
			'background' | 'illumination' | 'coloration',
			boolean
		>;

		/* -------------------------------------------- */
		/*  Vision Source Initialization                */
		/* -------------------------------------------- */

		/**
		 * Initialize the source with provided object data.
		 * @param data Initial data provided to the point source
		 * @return A reference to the initialized source
		 */
		initialize(data?: Partial<VisionSourceData>): this;

		/** Responsible for assigning the Vision Mode and handling exceptions based on vision special status. */
		protected _initializeVisionMode(): void;

		/** If this vision source background is rendered into the lighting container. */
		get preferred(): number;

		protected _getPolygonConfiguration(): {
			source: VisionSource<TObject>;
			type: 'sight';
			angle: number;
			rotation: number;
			externalRadius: number;
		};

		/** Create a restricted FOV polygon by limiting the radius of the unrestricted LOS polygon. */
		protected _createRestrictedPolygon(): PointSourcePolygon;

		/** Initialize the shaders used for this source, swapping to a different shader if the vision effect has changed. */
		protected _initializeShaders(): void;

		/** Initialize the blend mode and vertical sorting of this source relative to others in the container. */
		protected _initializeBlending(): void;

		/**
		 * Process new input data provided to the LightSource.
		 * @param data Initial data provided to the vision source
		 * @returns The changes compared to the prior data
		 */
		protected _initializeData(data: VisionSourceData): VisionSourceData;

		/* -------------------------------------------- */
		/*  Vision Source Rendering                     */
		/* -------------------------------------------- */

		protected _createMeshes(): Record<
			'background' | 'illumination' | 'coloration',
			PIXI.Mesh
		>;

		override destroy(): void;

		override refreshSource(): void;

		/** Render the containers used to represent this light source within the LightingLayer. */
		drawMeshes(): Record<
			'background' | 'illumination' | 'coloration',
			PIXI.Mesh
		>;

		/**
		 * Draw the background mesh which provide special vision.
		 * @returns The rendered light container.
		 */
		drawBackground(): PIXI.Mesh | null;

		/**
		 * Draw the illumination mesh which provide vision.
		 * @returns The rendered light container.
		 */
		drawVision(): PIXI.Mesh | null;

		/**
		 * Draw and return a container used to depict the visible color tint of the light source on the LightingLayer
		 * @returns An updated color container for the source
		 */
		drawColor(): PIXI.Mesh | null;

		/* -------------------------------------------- */
		/*  Shader Management                           */
		/* -------------------------------------------- */

		/** Update all layer uniforms. */
		protected _updateUniforms(): void;

		/** Update shader uniforms by providing data from this PointSource */
		_updateColorationUniforms(): void;

		/** Update shader uniforms by providing data from this PointSource */
		_updateIlluminationUniforms(): void;

		/** Update shader uniforms by providing data from this PointSource */
		protected _updateBackgroundUniforms(): void;

		/**
		 * Update shader uniforms shared by all shader types
		 * @param shader The shader being updated
		 */
		protected _updateCommonUniforms(shader: PIXI.Shader): void;

		/* -------------------------------------------- */
		/*  Animation Functions                         */
		/* -------------------------------------------- */

		/**
		 * Generic time animation with Vision Sources.
		 * @param dt Delta time.
		 */
		animateTime(dt: number): void;
	}

	interface VisionSourceData {
		/** The x-coordinate of the source location */
		x: number;
		/** The y-coordinate of the source location */
		y: number;
		/** An optional z-index sorting for the source */
		z?: number;
		/** The angle of rotation for this point source */
		rotation: number;
		/** The angle of emission for this point source */
		angle: number;
		/** The allowed radius of bright vision or illumination */
		bright: number;
		/** The allowed radius of dim vision or illumination */
		dim: number;
	}
}
