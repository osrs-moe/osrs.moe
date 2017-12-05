import plant_data from "./plant_data";
import debounce from "lodash-es/debounce";

let run = false;

const _second = 1000;
const _minute = _second * 60;
const fps = 60;
const view_interval = 360 * _minute; // in milliseconds
const slot_size = 5 * _minute; // slot size in milliseconds
const colors = ["#a55ca5", "#67b6c7", "#bccd7a", "#eb9743", "#ff24f2"];
const grid_color = "#eeeeee";
const center_color = "#00ff00";
const time_color = "#eeeeee";

function get_page_width_without_scrollbar() {
	return document.documentElement.clientWidth - 1;
}

let width = get_page_width_without_scrollbar();
let height = 225;
let bars_height = height - 25;


function size_canvas(redraw = false) {
	const canvas = document.getElementById("farmclock_canvas") as HTMLCanvasElement;
	if (canvas == null) {
		return;
	}

	requestAnimationFrame(() => {
		const ratio = window.devicePixelRatio || 1;
		width = get_page_width_without_scrollbar();

		canvas.width = width * ratio;
		canvas.height = height * ratio;
		canvas.style.width = width + "px";
		canvas.style.height = height + "px";

		const ctx = canvas.getContext("2d");

		if (ctx == null) {
			return;
		}

		ctx.scale(ratio, ratio);
		draw(ctx, redraw);
	});
}


function draw_line(ctx: CanvasRenderingContext2D, start_x: number, start_y: number, end_x: number, end_y: number, color: string) {
	ctx.save();
	ctx.strokeStyle = color;
	ctx.beginPath();
	ctx.moveTo(start_x, start_y);
	ctx.lineTo(end_x, end_y);
	ctx.stroke();
	ctx.restore();
}

function draw_bar(ctx: CanvasRenderingContext2D, upper_left_corner_x: number, upper_left_corner_y: number, width: number, height: number, color: string) {
	ctx.save();
	ctx.fillStyle = color;
	ctx.fillRect(upper_left_corner_x, upper_left_corner_y, width, height);
	ctx.restore();
}

function draw_text(ctx: CanvasRenderingContext2D, x: number, y: number, max_width: number, h: number, color: string, text: string) {
	ctx.save();
	ctx.fillStyle = color;
	ctx.font = h.toString() + "px sans-serif";
	ctx.fillText(text, x, y, max_width);
	ctx.restore();
}


function draw(ctx: CanvasRenderingContext2D, redraw = false) {
	if (ctx == null) {
		return;
	}
	ctx.clearRect(-1, -1, width + 2, height + 2);
	const now = new Date();
	const midnight = new Date();
	midnight.setUTCHours(0, 0, 0, 0);

	const ms_per_pixel = view_interval / width;
	const pixels_per_slot = slot_size / ms_per_pixel;
	const slots = Math.ceil(width / pixels_per_slot) + 1; // add a single slot for overlap

	const time_edges = {
		left: new Date(now.getTime() - (3 * 60 * 60 * 1000)).getTime(),
		right: new Date(now.getTime() + (3 * 60 * 60 * 1000)).getTime(),
	};

	const five_minutes_left = new Date(Math.floor(time_edges.left / slot_size) * slot_size);
	const left_edge = (five_minutes_left.getTime() - time_edges.left) / ms_per_pixel;
	const vertical_pixels_per_plant = bars_height / plant_data.length;
	const start_ms = five_minutes_left.getTime();

	for (let i = 0; i < slots; i++) {
		const slot_time = start_ms + (slot_size * i);
		const ms_since_midnight = slot_time - midnight.getTime();
		const x = left_edge + pixels_per_slot * i;

		for (let ii = 0; ii < plant_data.length; ii++) {
			if ((ms_since_midnight % plant_data[ii].interval) >= slot_size) {
				continue;
			}

			const y = vertical_pixels_per_plant * (plant_data.length - (ii + 1));
			const w = pixels_per_slot + 1;

			draw_bar(ctx, x, y, w, vertical_pixels_per_plant, colors[ii % colors.length]);

			// 20 minutes
			if (plant_data[ii].interval === 1200000) {
				const time = new Date(slot_time);
				const time_string =
					("0" + time.getUTCHours())
						.slice(-2)
					+ ":"
					+ ("0" + time.getUTCMinutes())
						.slice(-2);
				draw_text(ctx, x + 5, height - 5, (w * 4) - 5, 20, time_color, time_string);
				draw_line(ctx, x, bars_height, x, height, grid_color);
			}
		}

		// line on the right
		draw_line(ctx, x, 0, x, bars_height, grid_color);
	}

	// draw horizontal grid lines
	for (let i = 1; i < plant_data.length; i++) {
		const h = vertical_pixels_per_plant * i;
		draw_line(ctx, 0, h, width, h, grid_color);
	}

	const visualizer_center = Math.floor(width / 2);

	draw_line(ctx, visualizer_center, 0, visualizer_center, height, center_color);
	draw_line(ctx, 0, height, width, height, grid_color);
	draw_line(ctx, 0, bars_height, width, bars_height, grid_color);


	if (redraw && run) {
		setTimeout(draw, 1000 / fps, ctx, true);
	}
}

const resize_limiter = debounce(size_canvas, 50);

export const resize_canvas: EventListener = () => resize_limiter();
export const start = () => {
	run = true;
	size_canvas(true);
};
export const stop = () => run = false;
