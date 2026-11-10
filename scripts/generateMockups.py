#!/usr/bin/env python3
import os
import math
from PIL import Image, ImageDraw, ImageFont, ImageFilter

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
ACTUAL_DIR = os.path.join(BASE_DIR, 'docs', 'readme-assets', 'actual')
MOCKUP_DIR = os.path.join(BASE_DIR, 'docs', 'readme-assets', 'mockups')
HERO_DIR = os.path.join(BASE_DIR, 'docs', 'readme-assets', 'hero')

os.makedirs(MOCKUP_DIR, exist_ok=True)
os.makedirs(HERO_DIR, exist_ok=True)

FONT_PATH = '/System/Library/Fonts/Supplemental/Arial.ttf'
if not os.path.exists(FONT_PATH):
    FONT_PATH = '/System/Library/Fonts/Helvetica.ttc'

def get_font(size):
    try:
        return ImageFont.truetype(FONT_PATH, size)
    except:
        return ImageFont.load_default()

def create_browser_window(screenshot_img, url="https://assureai.in", title="AssureAI — Insurance Voice AI Agent", scale=1.0):
    """
    Wraps an actual screenshot inside a realistic macOS Safari/Chrome desktop browser window.
    """
    if scale != 1.0:
        new_w = int(screenshot_img.width * scale)
        new_h = int(screenshot_img.height * scale)
        screenshot_img = screenshot_img.resize((new_w, new_h), Image.Resampling.LANCZOS)

    sw, sh = screenshot_img.size
    header_h = 76
    corner_radius = 24
    
    window_w = sw
    window_h = sh + header_h
    
    # Create window base (header + screenshot)
    window = Image.new('RGBA', (window_w, window_h), (0, 0, 0, 0))
    
    # 1. Draw rounded header background
    header = Image.new('RGBA', (window_w, header_h), (248, 250, 252, 255)) # clean light slate
    draw_header = ImageDraw.Draw(header)
    
    # Draw bottom border of header
    draw_header.line([(0, header_h - 1), (window_w, header_h - 1)], fill=(226, 232, 240, 255), width=2)
    
    # Draw Traffic Light Window Controls
    dot_radius = 9
    dot_y = header_h // 2
    colors = [
        ((255, 95, 86, 255), (224, 68, 62, 255)),   # Red close
        ((255, 189, 46, 255), (214, 153, 23, 255)),  # Yellow minimize
        ((39, 201, 63, 255), (30, 160, 48, 255)),    # Green zoom
    ]
    start_x = 36
    spacing = 28
    for i, (fill_col, stroke_col) in enumerate(colors):
        cx = start_x + i * spacing
        draw_header.ellipse([cx - dot_radius, dot_y - dot_radius, cx + dot_radius, dot_y + dot_radius],
                            fill=fill_col, outline=stroke_col, width=1)

    # Draw URL Address Bar Pill
    pill_w = min(720, window_w - 400)
    pill_h = 42
    pill_x0 = (window_w - pill_w) // 2
    pill_y0 = (header_h - pill_h) // 2
    pill_x1 = pill_x0 + pill_w
    pill_y1 = pill_y0 + pill_h
    
    # Pill background
    draw_header.rounded_rectangle([pill_x0, pill_y0, pill_x1, pill_y1], radius=12,
                                  fill=(255, 255, 255, 255), outline=(226, 232, 240, 255), width=2)
    
    # Draw lock icon in URL bar
    lock_x = pill_x0 + 20
    lock_y = pill_y0 + 14
    # Lock loop
    draw_header.arc([lock_x + 3, lock_y, lock_x + 11, lock_y + 8], start=180, end=0, fill=(100, 116, 139, 255), width=2)
    # Lock body
    draw_header.rounded_rectangle([lock_x, lock_y + 7, lock_x + 14, lock_y + 16], radius=2,
                                  fill=(100, 116, 139, 255))
    
    # Draw URL text
    font_url = get_font(20)
    url_text = url
    draw_header.text((lock_x + 24, pill_y0 + 10), url_text, fill=(71, 85, 105, 255), font=font_url)
    
    # Paste header onto window
    window.paste(header, (0, 0))
    
    # Paste actual screenshot below header
    window.paste(screenshot_img, (0, header_h))
    
    # Apply rounded corners mask to the entire window
    mask = Image.new('L', (window_w, window_h), 0)
    mask_draw = ImageDraw.Draw(mask)
    mask_draw.rounded_rectangle([0, 0, window_w, window_h], radius=corner_radius, fill=255)
    
    # Put 1px outer stroke
    stroke_overlay = Image.new('RGBA', (window_w, window_h), (0, 0, 0, 0))
    stroke_draw = ImageDraw.Draw(stroke_overlay)
    stroke_draw.rounded_rectangle([0, 0, window_w - 1, window_h - 1], radius=corner_radius,
                                  outline=(203, 213, 225, 180), width=2)
    
    # Composite window with mask
    final_window = Image.new('RGBA', (window_w, window_h), (0, 0, 0, 0))
    final_window.paste(window, (0, 0), mask=mask)
    final_window.alpha_composite(stroke_overlay)
    
    return final_window

def apply_drop_shadow(window_img, shadow_blur=45, shadow_offset=(0, 25), shadow_color=(15, 23, 42, 70)):
    """
    Creates a realistic multi-stage soft shadow underneath the window.
    """
    ww, wh = window_img.size
    pad_x = shadow_blur * 2 + abs(shadow_offset[0])
    pad_y = shadow_blur * 2 + abs(shadow_offset[1])
    
    canvas_w = ww + pad_x * 2
    canvas_h = wh + pad_y * 2
    
    shadow_layer = Image.new('RGBA', (canvas_w, canvas_h), (0, 0, 0, 0))
    shadow_draw = ImageDraw.Draw(shadow_layer)
    
    # Draw soft shadow shape
    sx0 = pad_x + shadow_offset[0]
    sy0 = pad_y + shadow_offset[1]
    sx1 = sx0 + ww
    sy1 = sy0 + wh
    
    shadow_draw.rounded_rectangle([sx0, sy0, sx1, sy1], radius=24, fill=shadow_color)
    
    # Gaussian blur the shadow
    shadow_layer = shadow_layer.filter(ImageFilter.GaussianBlur(shadow_blur))
    
    # Second tighter contact shadow for grounding
    contact_layer = Image.new('RGBA', (canvas_w, canvas_h), (0, 0, 0, 0))
    contact_draw = ImageDraw.Draw(contact_layer)
    contact_draw.rounded_rectangle([pad_x + shadow_offset[0]//2, pad_y + shadow_offset[1]//2,
                                    pad_x + shadow_offset[0]//2 + ww, pad_y + shadow_offset[1]//2 + wh],
                                   radius=20, fill=(15, 23, 42, 90))
    contact_layer = contact_layer.filter(ImageFilter.GaussianBlur(15))
    
    # Composite shadow layers and window
    comp = Image.new('RGBA', (canvas_w, canvas_h), (0, 0, 0, 0))
    comp.alpha_composite(shadow_layer)
    comp.alpha_composite(contact_layer)
    comp.paste(window_img, (pad_x, pad_y), mask=window_img)
    
    return comp

def create_studio_canvas(width, height, top_color=(241, 245, 249), bottom_color=(226, 232, 240), glow_color=(37, 99, 235, 30)):
    """
    Creates a rich studio gradient background with a soft radial ambient brand glow.
    """
    canvas = Image.new('RGB', (width, height))
    draw = ImageDraw.Draw(canvas)
    
    # Linear vertical gradient
    for y in range(height):
        factor = y / height
        r = int(top_color[0] + (bottom_color[0] - top_color[0]) * factor)
        g = int(top_color[1] + (bottom_color[1] - top_color[1]) * factor)
        b = int(top_color[2] + (bottom_color[2] - top_color[2]) * factor)
        draw.line([(0, y), (width, y)], fill=(r, g, b))
        
    # Ambient radial glow in center
    glow = Image.new('RGBA', (width, height), (0, 0, 0, 0))
    glow_draw = ImageDraw.Draw(glow)
    
    cx, cy = width // 2, height // 2
    max_radius = min(width, height) // 2
    for r in range(max_radius, 0, -20):
        alpha = int(glow_color[3] * (1.0 - (r / max_radius)**2))
        glow_draw.ellipse([cx - r, cy - r // 2, cx + r, cy + r // 2],
                          fill=(glow_color[0], glow_color[1], glow_color[2], alpha))
                          
    glow = glow.filter(ImageFilter.GaussianBlur(60))
    canvas_rgba = canvas.convert('RGBA')
    canvas_rgba.alpha_composite(glow)
    
    return canvas_rgba

def generate_single_showcase(screenshot_filename, output_filename, url, page_badge="AssureAI Desktop Showcase"):
    """
    Generates a single high-res desktop showcase with studio lighting and browser frame.
    """
    print(f"Generating showcase: {output_filename} ...")
    src_path = os.path.join(ACTUAL_DIR, screenshot_filename)
    if not os.path.exists(src_path):
        print(f"Error: {src_path} not found!")
        return

    screenshot = Image.open(src_path).convert('RGBA')
    
    # Build browser window (scale down if 2880px to fit comfortably on 3200x2000 canvas)
    target_window_w = 2560
    scale = target_window_w / screenshot.width
    window = create_browser_window(screenshot, url=url, scale=scale)
    
    # Apply realistic drop shadow
    window_with_shadow = apply_drop_shadow(window, shadow_blur=50, shadow_offset=(0, 30), shadow_color=(15, 23, 42, 60))
    
    # Create studio canvas
    canvas_w = 3200
    canvas_h = 2200
    canvas = create_studio_canvas(canvas_w, canvas_h, top_color=(245, 247, 250), bottom_color=(226, 232, 240), glow_color=(37, 99, 235, 35))
    
    # Center window on canvas
    win_x = (canvas_w - window_with_shadow.width) // 2
    win_y = (canvas_h - window_with_shadow.height) // 2 + 30
    canvas.alpha_composite(window_with_shadow, (win_x, win_y))
    
    # Add top title & badge
    draw = ImageDraw.Draw(canvas)
    badge_font = get_font(24)
    badge_text = f"ASSURE.AI SHOWCASE  •  {page_badge}  •  MERN & Bolna.ai"
    
    # Badge pill
    bbox = draw.textbbox((0, 0), badge_text, font=badge_font)
    bw = bbox[2] - bbox[0] + 48
    bh = bbox[3] - bbox[1] + 24
    bx = (canvas_w - bw) // 2
    by = 45
    draw.rounded_rectangle([bx, by, bx + bw, by + bh], radius=20, fill=(255, 255, 255, 230), outline=(203, 213, 225, 255), width=2)
    draw.text((bx + 24, by + 12), badge_text, fill=(37, 99, 235, 255), font=badge_font)
    
    out_path = os.path.join(MOCKUP_DIR, output_filename)
    canvas.convert('RGB').save(out_path, quality=95)
    print(f"✅ Saved showcase to: {out_path}")

def generate_multi_screen_showcase():
    """
    Requirement 5.C: Complete Website Showcase
    A professional multi-screen portfolio composition displaying the most important website pages:
    - Center hero screen: Bulk Calls Campaign Dashboard
    - Left background screen: Homepage
    - Right background screen: Chat Assistant
    - Foreground floating screen: Call Interaction Modal
    """
    print("Generating Complete Multi-Screen Website Showcase (5.C) ...")
    canvas_w = 3840
    canvas_h = 2400
    canvas = create_studio_canvas(canvas_w, canvas_h, top_color=(241, 245, 249), bottom_color=(218, 225, 233), glow_color=(79, 70, 229, 45))
    
    # Load actual screenshots
    img_home = Image.open(os.path.join(ACTUAL_DIR, '01_homepage_viewport.png')).convert('RGBA')
    img_dash = Image.open(os.path.join(ACTUAL_DIR, '04_bulk_calls_dashboard_viewport.png')).convert('RGBA')
    img_chat = Image.open(os.path.join(ACTUAL_DIR, '07_chat_assistant_viewport.png')).convert('RGBA')
    img_modal = Image.open(os.path.join(ACTUAL_DIR, '05_call_interaction_modal.png')).convert('RGBA')
    img_users = Image.open(os.path.join(ACTUAL_DIR, '06_user_management_viewport.png')).convert('RGBA')
    
    # 1. Left Background Screen: Homepage
    win_home = create_browser_window(img_home, url="https://assureai.in/", scale=0.55)
    win_home_shadow = apply_drop_shadow(win_home, shadow_blur=40, shadow_offset=(-15, 25), shadow_color=(15, 23, 42, 65))
    
    # 2. Right Background Screen: Chat Assistant
    win_chat = create_browser_window(img_chat, url="https://assureai.in/chat", scale=0.55)
    win_chat_shadow = apply_drop_shadow(win_chat, shadow_blur=40, shadow_offset=(15, 25), shadow_color=(15, 23, 42, 65))

    # 3. Top-Right Background Screen: User Management
    win_users = create_browser_window(img_users, url="https://assureai.in/admin/users", scale=0.50)
    win_users_shadow = apply_drop_shadow(win_users, shadow_blur=35, shadow_offset=(10, 20), shadow_color=(15, 23, 42, 50))
    
    # 4. Center Primary Screen: Bulk Calls Dashboard
    win_dash = create_browser_window(img_dash, url="https://assureai.in/admin/bulk-calls", scale=0.72)
    win_dash_shadow = apply_drop_shadow(win_dash, shadow_blur=60, shadow_offset=(0, 40), shadow_color=(15, 23, 42, 80))
    
    # 5. Foreground Floating Accent Screen: Call Interaction Details Modal
    win_modal = create_browser_window(img_modal, url="https://assureai.in/admin/bulk-calls/interaction?id=rahul_sharma", scale=0.58)
    win_modal_shadow = apply_drop_shadow(win_modal, shadow_blur=55, shadow_offset=(20, 35), shadow_color=(15, 23, 42, 90))
    
    # Composite layers in order
    # Layer 1: Left Homepage
    canvas.alpha_composite(win_home_shadow, (120, 320))
    
    # Layer 2: Right Chat Assistant
    canvas.alpha_composite(win_chat_shadow, (canvas_w - win_chat_shadow.width - 120, 320))

    # Layer 3: Top Users
    canvas.alpha_composite(win_users_shadow, (canvas_w // 2 - win_users_shadow.width // 2, 140))
    
    # Layer 4: Center Bulk Calls Dashboard
    canvas.alpha_composite(win_dash_shadow, (canvas_w // 2 - win_dash_shadow.width // 2, 480))
    
    # Layer 5: Foreground Modal Accent (Floating bottom-right over dashboard)
    canvas.alpha_composite(win_modal_shadow, (canvas_w - win_modal_shadow.width - 240, 950))
    
    # Header Banner text
    draw = ImageDraw.Draw(canvas)
    header_font = get_font(52)
    sub_font = get_font(26)
    
    title = "AssureAI — Unified Insurance Voice AI & Campaign Ecosystem"
    subtitle = "Actual Frontend Showcase: Bulk Automated Calling • Call Transcript Intelligence • User Governance • Conversational AI"
    
    tb = draw.textbbox((0, 0), title, font=header_font)
    tw = tb[2] - tb[0]
    draw.text(((canvas_w - tw) // 2, 45), title, fill=(15, 23, 42, 255), font=header_font)
    
    sb = draw.textbbox((0, 0), subtitle, font=sub_font)
    sw = sb[2] - sb[0]
    draw.text(((canvas_w - sw) // 2, 115), subtitle, fill=(100, 116, 139, 255), font=sub_font)
    
    out_path = os.path.join(MOCKUP_DIR, '07_complete_website_showcase.png')
    canvas.convert('RGB').save(out_path, quality=95)
    print(f"✅ Saved Complete Multi-Screen Showcase to: {out_path}")

def generate_hero_banner():
    """
    Requirement 5.D: Website Hero Image
    A premium website-themed hero banner for top section of GitHub README.
    Combines the abstract AI-generated hero background with a floating desktop browser mockup
    and modern branding typography.
    """
    print("Generating Website Hero Banner (5.D) ...")
    bg_path = os.path.join(HERO_DIR, '01_website_hero_background.jpg')
    if not os.path.exists(bg_path):
        print("Hero background not found!")
        return

    hero_bg = Image.open(bg_path).convert('RGBA')
    
    # Resize hero background to 2880 x 1650 for optimal vertical composition
    banner_w = 2880
    banner_h = 1650
    hero_bg = hero_bg.resize((banner_w, banner_h), Image.Resampling.LANCZOS)
    
    # Create dark gradient overlay for text readability on top
    overlay = Image.new('RGBA', (banner_w, banner_h), (0, 0, 0, 0))
    overlay_draw = ImageDraw.Draw(overlay)
    
    # Subtle dark vignette and top glow
    for y in range(banner_h):
        factor = y / banner_h
        alpha = int(45 + 75 * (1 - factor))
        overlay_draw.line([(0, y), (banner_w, y)], fill=(10, 15, 30, alpha))
        
    hero_bg.alpha_composite(overlay)
    
    # Add floating desktop browser window of the Dashboard & Call Assistant
    img_dash = Image.open(os.path.join(ACTUAL_DIR, '04_bulk_calls_dashboard_viewport.png')).convert('RGBA')
    win_dash = create_browser_window(img_dash, url="https://assureai.in/admin/bulk-calls", scale=0.62)
    win_dash_shadow = apply_drop_shadow(win_dash, shadow_blur=50, shadow_offset=(0, 30), shadow_color=(0, 0, 0, 130))
    
    # Place window floating cleanly below the header text
    win_x = (banner_w - win_dash_shadow.width) // 2
    win_y = 360
    hero_bg.alpha_composite(win_dash_shadow, (win_x, win_y))
    
    # Draw Hero Typography
    draw = ImageDraw.Draw(hero_bg)
    badge_font = get_font(24)
    title_font = get_font(56)
    desc_font = get_font(26)
    
    # Badge
    badge_text = "ASSURE.AI  •  NEXT-GEN INSURANCE VOICE AI PLATFORM"
    tb = draw.textbbox((0, 0), badge_text, font=badge_font)
    bw = tb[2] - tb[0] + 48
    bh = tb[3] - tb[1] + 20
    bx = (banner_w - bw) // 2
    by = 75
    draw.rounded_rectangle([bx, by, bx + bw, by + bh], radius=20, fill=(15, 23, 42, 255), outline=(56, 189, 248, 255), width=2)
    draw.text((bx + 24, by + 8), badge_text, fill=(56, 189, 248, 255), font=badge_font)
    
    # Main Headline
    title_text = "AssureAI — Intelligent Voice Assistant & Campaign Hub"
    tt_box = draw.textbbox((0, 0), title_text, font=title_font)
    tw = tt_box[2] - tt_box[0]
    draw.text(((banner_w - tw) // 2, 145), title_text, fill=(255, 255, 255, 255), font=title_font)
    
    # Subtitle
    sub_text = "Automated AI Outbound Calling • Real-Time Conversation Transcripts • MERN Stack & Bolna.ai Integration"
    st_box = draw.textbbox((0, 0), sub_text, font=desc_font)
    sw = st_box[2] - st_box[0]
    draw.text(((banner_w - sw) // 2, 235), sub_text, fill=(203, 213, 225, 230), font=desc_font)
    
    out_path = os.path.join(HERO_DIR, '02_assureai_readme_hero_banner.png')
    hero_bg.convert('RGB').save(out_path, quality=95)
    print(f"✅ Saved Hero Banner to: {out_path}")

def main():
    # 1. Homepage Showcase (5.A)
    generate_single_showcase(
        '01_homepage_viewport.png',
        '01_homepage_browser_showcase.png',
        url='https://assureai.in',
        page_badge='Homepage Showcase'
    )
    
    # 2. Dashboard Showcase (5.B)
    generate_single_showcase(
        '04_bulk_calls_dashboard_viewport.png',
        '02_dashboard_browser_showcase.png',
        url='https://assureai.in/admin/bulk-calls',
        page_badge='Admin Bulk Calls Dashboard'
    )
    
    # 3. Call Interaction Showcase
    generate_single_showcase(
        '05_call_interaction_modal.png',
        '03_call_interaction_showcase.png',
        url='https://assureai.in/admin/bulk-calls/interaction?id=call_102',
        page_badge='Voice Call Interaction & Transcript Inspector'
    )
    
    # 4. User Management Showcase
    generate_single_showcase(
        '06_user_management_viewport.png',
        '04_user_management_showcase.png',
        url='https://assureai.in/admin/users',
        page_badge='User Administration & Access Control'
    )
    
    # 5. Chat Assistant Showcase
    generate_single_showcase(
        '07_chat_assistant_viewport.png',
        '05_chat_assistant_showcase.png',
        url='https://assureai.in/chat',
        page_badge='Interactive Insurance AI Assistant'
    )
    
    # 6. Call History Showcase
    generate_single_showcase(
        '10_call_history_viewport.png',
        '06_call_history_showcase.png',
        url='https://assureai.in/history',
        page_badge='Customer Call Interaction History'
    )
    
    # 7. Complete Multi-Screen Website Showcase (5.C)
    generate_multi_screen_showcase()
    
    # 8. Website Hero Banner (5.D)
    generate_hero_banner()
    
    print("\n✨ All Professional Website Mockups and Showcase Assets Generated Successfully!")

if __name__ == '__main__':
    main()
